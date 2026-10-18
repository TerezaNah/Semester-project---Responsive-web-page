#!/bin/bash
# Export 50 nejposlouchanějších skladeb ze Spotify + vytvoření veřejného playlistu.
# Přihlášení: Authorization Code + PKCE (žádný Client Secret).
#
# Použití:  ./tools/spotify-export.sh <CLIENT_ID> [short_term|medium_term|long_term]
# Výstup:   tools/spotify-top50.json     (pole [pořadí, název, interpret, žánr, rok, id skladby])
#           tools/spotify-playlist.json  ({"id": "...", "url": "..."})

set -euo pipefail

CLIENT_ID="${1:?Chybí Client ID}"
RANGE="${2:-long_term}"
REDIRECT_URI="http://127.0.0.1:8888/callback"
OUT_DIR="$(cd "$(dirname "$0")" && pwd)"
OUT_FILE="$OUT_DIR/spotify-top50.json"
PLAYLIST_FILE="$OUT_DIR/spotify-playlist.json"

b64url() { openssl base64 -A | tr '+/' '-_' | tr -d '='; }

# PKCE: náhodný verifier a z něj odvozený challenge
VERIFIER="$(openssl rand 64 | b64url)"
CHALLENGE="$(printf '%s' "$VERIFIER" | openssl dgst -sha256 -binary | b64url)"
STATE="$(openssl rand 16 | b64url)"

AUTH_URL="https://accounts.spotify.com/authorize?response_type=code"
AUTH_URL+="&client_id=${CLIENT_ID}"
AUTH_URL+="&scope=$(printf '%s' 'user-top-read playlist-modify-public' | jq -sRr @uri)"
AUTH_URL+="&redirect_uri=$(printf '%s' "$REDIRECT_URI" | jq -sRr @uri)"
AUTH_URL+="&state=${STATE}"
AUTH_URL+="&code_challenge_method=S256&code_challenge=${CHALLENGE}"

echo "Otevírám přihlášení Spotify v prohlížeči..."
open "$AUTH_URL"

# Lokální server jen na 127.0.0.1, čeká na přesměrování se kódem
RESPONSE=$'HTTP/1.1 200 OK\r\nContent-Type: text/html; charset=utf-8\r\nConnection: close\r\n\r\n<!DOCTYPE html><meta charset="utf-8"><p>Hotovo, toto okno můžete zavřít.</p>'
CODE=""
for _ in 1 2 3 4 5; do
    REQUEST="$(printf '%s' "$RESPONSE" | nc -l 127.0.0.1 8888 | head -n 1 || true)"
    case "$REQUEST" in
        *"/callback?"*)
            QUERY="${REQUEST#*\?}"
            QUERY="${QUERY%% *}"
            GOT_STATE="$(printf '%s' "$QUERY" | tr '&' '\n' | sed -n 's/^state=//p')"
            if [ "$GOT_STATE" != "$STATE" ]; then
                echo "Neplatný parametr state, končím." >&2
                exit 1
            fi
            CODE="$(printf '%s' "$QUERY" | tr '&' '\n' | sed -n 's/^code=//p')"
            break
            ;;
    esac
done

if [ -z "$CODE" ]; then
    echo "Nepodařilo se získat autorizační kód (přístup zamítnut nebo vypršel čas)." >&2
    exit 1
fi

# Výměna kódu za přístupový token (přes HTTPS, s časovým limitem)
TOKEN_JSON="$(curl -sS --max-time 20 -X POST https://accounts.spotify.com/api/token \
    -H 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode "grant_type=authorization_code" \
    --data-urlencode "code=${CODE}" \
    --data-urlencode "redirect_uri=${REDIRECT_URI}" \
    --data-urlencode "client_id=${CLIENT_ID}" \
    --data-urlencode "code_verifier=${VERIFIER}")"

ACCESS_TOKEN="$(printf '%s' "$TOKEN_JSON" | jq -r '.access_token // empty')"
if [ -z "$ACCESS_TOKEN" ]; then
    echo "Získání tokenu selhalo: $(printf '%s' "$TOKEN_JSON" | jq -r '.error_description // .error // "neznámá chyba"')" >&2
    exit 1
fi

api_get() {
    curl -sS --max-time 20 -H "Authorization: Bearer ${ACCESS_TOKEN}" "https://api.spotify.com/v1$1"
}

api_post() {
    curl -sS --max-time 20 -X POST \
        -H "Authorization: Bearer ${ACCESS_TOKEN}" \
        -H "Content-Type: application/json" \
        --data "$2" "https://api.spotify.com/v1$1"
}

echo "Stahuji 50 nejposlouchanějších skladeb (${RANGE})..."
TRACKS_JSON="$(api_get "/me/top/tracks?limit=50&time_range=${RANGE}")"

if ! printf '%s' "$TRACKS_JSON" | jq -e '.items' >/dev/null 2>&1; then
    echo "Chyba API: $(printf '%s' "$TRACKS_JSON" | jq -r '.error.message // "neznámá chyba"')" >&2
    exit 1
fi

# Spotify žánry u interpretů nevrací, doplní se ručně do music.js ("—" = zatím bez žánru)
printf '%s' "$TRACKS_JSON" | jq '
    [ .items | to_entries[]
      | [ (.key + 1),
          .value.name,
          .value.artists[0].name,
          "—",
          (.value.album.release_date[0:4] | tonumber),
          .value.id ] ]
' > "$OUT_FILE"

echo "Uloženo $(jq 'length' "$OUT_FILE") skladeb do $OUT_FILE"

# Veřejný playlist: nejdřív nový endpoint /me/playlists, při chybě starší /users/{id}/playlists
echo "Vytvářím veřejný playlist..."
PLAYLIST_BODY='{"name":"My hobbies – oblíbené","description":"Mých 50 nejposlouchanějších skladeb z webu My Little Universe.","public":true}'
PLAYLIST_JSON="$(api_post "/me/playlists" "$PLAYLIST_BODY")"
PLAYLIST_ID="$(printf '%s' "$PLAYLIST_JSON" | jq -r '.id // empty')"

if [ -z "$PLAYLIST_ID" ]; then
    USER_ID="$(api_get "/me" | jq -r '.id // empty')"
    PLAYLIST_JSON="$(api_post "/users/${USER_ID}/playlists" "$PLAYLIST_BODY")"
    PLAYLIST_ID="$(printf '%s' "$PLAYLIST_JSON" | jq -r '.id // empty')"
fi

if [ -z "$PLAYLIST_ID" ]; then
    echo "Playlist se nepodařilo vytvořit: $(printf '%s' "$PLAYLIST_JSON" | jq -r '.error.message // "neznámá chyba"')" >&2
    echo "Soubor se skladbami je uložený, playlist můžete vytvořit ručně." >&2
    exit 1
fi

URIS="$(jq -c '{uris: [ .[] | "spotify:track:" + .[5] ]}' "$OUT_FILE")"
ADD_JSON="$(api_post "/playlists/${PLAYLIST_ID}/items" "$URIS")"
if ! printf '%s' "$ADD_JSON" | jq -e '.snapshot_id' >/dev/null 2>&1; then
    ADD_JSON="$(api_post "/playlists/${PLAYLIST_ID}/tracks" "$URIS")"
fi
if ! printf '%s' "$ADD_JSON" | jq -e '.snapshot_id' >/dev/null 2>&1; then
    echo "Skladby se do playlistu nepodařilo přidat: $(printf '%s' "$ADD_JSON" | jq -r '.error.message // "neznámá chyba"')" >&2
    exit 1
fi

jq -n --arg id "$PLAYLIST_ID" '{id: $id, url: ("https://open.spotify.com/playlist/" + $id)}' > "$PLAYLIST_FILE"

echo "Hotovo. Playlist: https://open.spotify.com/playlist/${PLAYLIST_ID}"
