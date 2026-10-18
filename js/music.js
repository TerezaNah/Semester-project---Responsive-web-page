/* ==========================================
   MUSIC TABLE - DATA + DATATABLES INIT
========================================== */

const musicData = [
    [1,"Focus (feat. CLOVES)","John Summit","House",2025,"0xaXwvcjq7aAKwMKe22Bw7"],
    [2,"Escape (feat. Hayla)","Kx5","Progresivní house",2023,"3VpxEo6vMpi4rQ6t2WVVkK"],
    [3,"Ghosts 'n' Stuff","deadmau5","Progresivní house",2009,"4ua0IepBEISCWwF8dTJvcU"],
    [4,"Hold That Sucker Down (Mixed) - Charlotte de Witte Trance Remix","Jerome Isma-Ae","Trance",2020,"4LVeqapyAPVK1p4I4KPa0i"],
    [5,"Where You Are","John Summit","House",2023,"4qDpLaFGf5ampf2DXD2TMA"],
    [6,"Itty Bitty","Ashnikko","Pop",2025,"6TxJ6ocfLpkKkY8152ttpM"],
    [7,"The Age Of Love (Charlotte de Witte & Enrico Sangiuliano Remix) - Charlotte de Witte & Enrico Sangiuliano Remix - Edit","Age Of Love","Trance",2021,"38i2IOw4HtOUDDocgNT0o7"],
    [8,"The Veldt - Radio Edit","deadmau5","Progresivní house",2012,"1vQ92830bxiBcIhpUj4qrn"],
    [9,"Where's My Love","SYML","Indie folk",2019,"1B62o4CbdL9ckGvwsz2cgn"],
    [10,"The Ocean - Still Young & BRØMANCE Remix","Steve Angello","House",2023,"21IwThJ6FgJt0U9j4ss7NG"],
    [11,"1-800","bbno$","Hip hop",2025,"6NBZu27n3cxEk4y4c2Kxi8"],
    [12,"Good Life","ZHU","Deep house",2016,"6MWYSp8nWt4IZiRMCDPHXT"],
    [13,"Tragedy","Bee Gees","Disco",1979,"6UXXeFqMBGiqjkzQzkMT3E"],
    [14,"One Assassination Under God","Marilyn Manson","Industriální metal",2024,"7ve3QsU7QcPdl8DnsyywGv"],
    [15,"Hold That Sucker Down - Jerome Isma-Ae's 10 Year Anniversary Mix","Jerome Isma-Ae","Trance",2015,"2xqiKaEZZVpOjFh3U8rZIu"],
    [16,"Ghosts 'n' Stuff","deadmau5","Progresivní house",2009,"5m4taQjTIjgEBU6mWpv5OC"],
    [17,"End of Beginning","Djo","Indie rock",2022,"3qhlB30KknSejmIvZZLjOD"],
    [18,"How Long","Tove Lo","Pop",2022,"5qTSLCyc4KtL4H7aCL1RbY"],
    [19,"Fall","Lisa Hannigan","Indie folk",2016,"0HFqPzJYCZgQYuqNX0HDJm"],
    [20,"You Always Say","French 79","Synthpop",2023,"3ogY5aUgGAR0zY1qOGDcsc"],
    [21,"Bright Lights (feat. AR/CO)","Kx5","Progresivní house",2023,"7hz4FnANJOY7tR8eutPxIP"],
    [22,"Grease - 2007 Remaster","Frankie Valli","Pop",1978,"5Vrczz39CvlD3OGCa6utoA"],
    [23,"Silence - Niels van Gogh vs Thomas Gold Remix [Radio Edit]","Delerium","Elektronika",2008,"6VUTDBWIYivB96wd5xcR9K"],
    [24,"I Remember - John Summit Remix","deadmau5","Progresivní house",2023,"7EroGeDg1uteOaQ45Ftfiz"],
    [25,"Delete Ya","Djo","Indie rock",2025,"7tFI5cqfAoR7MIvmbw1qd8"],
    [26,"Thing Called Love - Edit","Above & Beyond","Trance",2011,"57vnteSdPw1r0KPK6GKB3z"],
    [27,"RUNAWAY","OneRepublic","Pop rock",2023,"07fbDnkKdZGk1gLvknxrns"],
    [28,"Hot Love - A Side","T. Rex","Glam rock",1971,"4R5qHNB2gdxBM2LDNaJZeO"],
    [29,"Strobe - Radio Edit","deadmau5","Progresivní house",2010,"6c9EGVj5CaOeoKd9ecMW1U"],
    [30,"Daniela","Lucie","Pop rock",2002,"1Ec0XZf5sxLX7qj4A48DnO"],
    [31,"Smother","Daughter","Indie folk",2013,"1qFb85QhwOqpnAKh7ahsGQ"],
    [32,"Starboy","The Weeknd","R&B",2016,"7MXVkk9YMctZqd1Srtv4MB"],
    [33,"Youth","Daughter","Indie folk",2013,"2Ck6gblyk3UFCVPTh8o3TN"],
    [34,"Science (feat. Stevie Appleton) - Radio Edit","deadmau5","Progresivní house",2026,"0KZ47s9X43VaErZicJHrny"],
    [35,"Sweet Disposition","The Temper Trap","Indie rock",2009,"1jUkHIMc7UaJQuzWe5Iop2"],
    [36,"Science (feat. Stevie Appleton)","deadmau5","Progresivní house",2026,"1JN37cHLmc852rbTdpVq8f"],
    [37,"Ghost","Delta Heavy","Drum and bass",2016,"3A9Qx8altSLoLZ8TNYcJwM"],
    [38,"Something On My Mind","Purple Disco Machine","Nu-disco",2023,"7uEvezzgCoYmqRDloOXUSR"],
    [39,"All My Tears","Ane Brun","Indie folk",2023,"10SV4dIbNm3Q6pAPk911B6"],
    [40,"I Remember","Kaskade","House",2008,"5miifYL53idUsDxGKjICtb"],
    [41,"As Sick As The Secrets Within","Marilyn Manson","Industriální metal",2024,"7hK0aTf0wyxRkYqWAabUwG"],
    [42,"Tell Me Why - Radio Edit","Supermode","House",2006,"4yhGkvdYU5bi4950r80FRo"],
    [43,"The Veldt Cinema - BYNX Edit","deadmau5","Progresivní house",2023,"1GD5ooLHgV9nolrem1DBiB"],
    [44,"Now","Highly Sedated","Alternativní rock",2017,"7hjXiFvneCutThGWnf6h3S"],
    [45,"Get It On","T. Rex","Glam rock",1971,"0LoQuiekvzqx7n8flgEKzF"],
    [46,"Girl, You'll Be a Woman Soon","Urge Overkill","Alternativní rock",1992,"1mSzuXVjjKC0bPh6iG6xjy"],
    [47,"(Don't Fear) The Reaper","Blue Öyster Cult","Hard rock",1976,"5QTxFnGygVM4jFQiBovmRo"],
    [48,"King of Sweden","Future Islands","Synthpop",2024,"72sMWFwbQq4kQ6EqnWdUZf"],
    [49,"Need To Feel Loved - Adam K & Soha Vocal Mix","Reflekt","Trance",2004,"30cjLreSF4Xq0uAB89i2Ac"],
    [50,"Redlight","Swedish House Mafia","House",2022,"48Jf12YHPBCAfAzi255Rvr"]
];


/* Obaly alb: ID skladby ze Spotify -> soubor v images/hudba */

const coverFiles = {
    "0xaXwvcjq7aAKwMKe22Bw7": "obal-39.jpg",
    "3VpxEo6vMpi4rQ6t2WVVkK": "obal-43.jpg",
    "4ua0IepBEISCWwF8dTJvcU": "obal-42.jpg",
    "4LVeqapyAPVK1p4I4KPa0i": "obal-17.jpg",
    "4qDpLaFGf5ampf2DXD2TMA": "obal-15.jpg",
    "6TxJ6ocfLpkKkY8152ttpM": "obal-19.jpg",
    "38i2IOw4HtOUDDocgNT0o7": "obal-03.jpg",
    "1vQ92830bxiBcIhpUj4qrn": "obal-25.jpg",
    "1B62o4CbdL9ckGvwsz2cgn": "obal-46.jpg",
    "21IwThJ6FgJt0U9j4ss7NG": "obal-10.jpg",
    "6NBZu27n3cxEk4y4c2Kxi8": "obal-26.jpg",
    "6MWYSp8nWt4IZiRMCDPHXT": "obal-09.jpg",
    "6UXXeFqMBGiqjkzQzkMT3E": "obal-18.jpg",
    "7ve3QsU7QcPdl8DnsyywGv": "obal-45.jpg",
    "2xqiKaEZZVpOjFh3U8rZIu": "obal-30.jpg",
    "5m4taQjTIjgEBU6mWpv5OC": "obal-28.jpg",
    "3qhlB30KknSejmIvZZLjOD": "obal-06.jpg",
    "5qTSLCyc4KtL4H7aCL1RbY": "obal-35.jpg",
    "0HFqPzJYCZgQYuqNX0HDJm": "obal-44.jpg",
    "3ogY5aUgGAR0zY1qOGDcsc": "obal-34.jpg",
    "7hz4FnANJOY7tR8eutPxIP": "obal-43.jpg",
    "5Vrczz39CvlD3OGCa6utoA": "obal-32.jpg",
    "6VUTDBWIYivB96wd5xcR9K": "obal-23.jpg",
    "7EroGeDg1uteOaQ45Ftfiz": "obal-01.jpg",
    "7tFI5cqfAoR7MIvmbw1qd8": "obal-21.jpg",
    "57vnteSdPw1r0KPK6GKB3z": "obal-29.jpg",
    "07fbDnkKdZGk1gLvknxrns": "obal-04.jpg",
    "4R5qHNB2gdxBM2LDNaJZeO": "obal-24.jpg",
    "6c9EGVj5CaOeoKd9ecMW1U": "obal-33.jpg",
    "1Ec0XZf5sxLX7qj4A48DnO": "obal-11.jpg",
    "1qFb85QhwOqpnAKh7ahsGQ": "obal-13.jpg",
    "7MXVkk9YMctZqd1Srtv4MB": "obal-20.jpg",
    "2Ck6gblyk3UFCVPTh8o3TN": "obal-47.jpg",
    "0KZ47s9X43VaErZicJHrny": "obal-31.jpg",
    "1jUkHIMc7UaJQuzWe5Iop2": "obal-27.jpg",
    "1JN37cHLmc852rbTdpVq8f": "obal-31.jpg",
    "3A9Qx8altSLoLZ8TNYcJwM": "obal-16.jpg",
    "7uEvezzgCoYmqRDloOXUSR": "obal-36.jpg",
    "10SV4dIbNm3Q6pAPk911B6": "obal-38.jpg",
    "5miifYL53idUsDxGKjICtb": "obal-08.jpg",
    "7hK0aTf0wyxRkYqWAabUwG": "obal-12.jpg",
    "4yhGkvdYU5bi4950r80FRo": "obal-14.jpg",
    "1GD5ooLHgV9nolrem1DBiB": "obal-02.jpg",
    "7hjXiFvneCutThGWnf6h3S": "obal-40.jpg",
    "0LoQuiekvzqx7n8flgEKzF": "obal-24.jpg",
    "1mSzuXVjjKC0bPh6iG6xjy": "obal-05.jpg",
    "5QTxFnGygVM4jFQiBovmRo": "obal-07.jpg",
    "72sMWFwbQq4kQ6EqnWdUZf": "obal-41.jpg",
    "30cjLreSF4Xq0uAB89i2Ac": "obal-22.jpg",
    "48Jf12YHPBCAfAzi255Rvr": "obal-37.jpg"

};


/* Pruh s obaly nad tabulkou: ukazuje skladby, které jsou právě na stránce */

function renderCoverStrip(table) {

    const strip = document.getElementById("coverStrip");
    if (!strip) {
        return;
    }

    const files = [];
    table.rows({ page: "current" }).data().each(function (row) {
        const file = coverFiles[row[5]];
        // Stejné album je v pruhu jen jednou
        if (file && !files.includes(file)) {
            files.push(file);
        }
    });

    strip.replaceChildren();

    files.forEach(function (file) {
        const img = document.createElement("img");
        img.src = "images/hudba/" + file;
        img.alt = "";
        img.width = 300;
        img.height = 300;
        strip.appendChild(img);
    });

    strip.hidden = files.length === 0;
}


const musicTable = new DataTable("#musicTable", {

    data: musicData,

    columns: [
        { title: "#" },
        { title: "Název" },
        { title: "Interpret" },
        { title: "Žánr" },
        { title: "Rok" },
        {
            title: "Přehrát",
            data: 5,
            orderable: false,
            searchable: false,
            className: "text-center",
            render: function (id, type, row) {
                if (type !== "display") {
                    return "";
                }
                // ID skladby ze Spotify obsahuje jen písmena a číslice
                if (!/^[A-Za-z0-9]+$/.test(id)) {
                    return "";
                }
                const label = "Přehrát na Spotify: " + row[1] + " – " + row[2];
                return '<a class="play-link" href="https://open.spotify.com/track/' + id +
                    '" target="_blank" rel="noopener noreferrer" aria-label="' +
                    label.replace(/"/g, "&quot;") +
                    '"><i class="bi bi-play-circle-fill"></i></a>';
            }
        }
    ],

    pageLength: 10,

    lengthMenu: [10, 25, 50],

    order: [[0, "asc"]],

    language: {
        search: "Hledat:",
        searchPlaceholder: "Název nebo interpret",
        lengthLabels: { "-1": "Vše" },
        info: "Zobrazeno _START_ až _END_ z _TOTAL_ záznamů",
        infoEmpty: "Žádné záznamy",
        infoFiltered: "(filtrováno z _MAX_ záznamů)",
        zeroRecords: "Nic se nenašlo",
        emptyTable: "Tabulka je prázdná",
        lengthMenu: "Zobrazit _MENU_ záznamů",
        paginate: {
            first: "První",
            previous: "Předchozí",
            next: "Další",
            last: "Poslední"
        }
    },

    layout: {
        topStart: "pageLength",
        topEnd: "search",
        bottomStart: "info",
        bottomEnd: "paging"
    }

});

// Při každém překreslení tabulky (stránka, počet řádků, hledání, řazení)
musicTable.on("draw", function () {
    renderCoverStrip(musicTable);
});

renderCoverStrip(musicTable);
