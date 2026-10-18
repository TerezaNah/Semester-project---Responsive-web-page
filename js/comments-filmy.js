/* ==========================================
   KOMENTÁŘE NÁVŠTĚVNÍKŮ – FILMY
   Ukládá se jen v prohlížeči (localStorage).
========================================== */

const STORAGE_KEY = "mlu-film-comments";
const MAX_NAME = 40;
const MAX_TEXT = 500;
const MAX_COMMENTS = 50;

const form = document.getElementById("filmCommentForm");
const nameInput = document.getElementById("filmCommentName");
const textInput = document.getElementById("filmCommentText");
const list = document.getElementById("filmCommentList");
const emptyMessage = document.getElementById("filmCommentEmpty");


// Načtení komentářů. Data z localStorage nelze považovat za důvěryhodná,
// proto se ověřuje tvar i délka každé položky.
function loadComments() {

    try {

        const raw = localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return [];
        }

        const parsed = JSON.parse(raw);

        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed
            .filter(function (item) {
                return item
                    && typeof item.name === "string"
                    && typeof item.text === "string"
                    && typeof item.date === "string";
            })
            .slice(0, MAX_COMMENTS)
            .map(function (item) {
                return {
                    name: item.name.slice(0, MAX_NAME),
                    text: item.text.slice(0, MAX_TEXT),
                    date: item.date.slice(0, 40)
                };
            });

    } catch (error) {

        return [];

    }

}


function saveComments(comments) {

    try {

        localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));

    } catch (error) {

        // Úložiště může být zakázané nebo plné. Komentář zůstane jen na stránce.

    }

}


// Vytvoření jednoho komentáře. Text se vkládá přes textContent,
// takže se nikdy nevyhodnotí jako HTML.
function createCommentElement(comment, onDelete) {

    const card = document.createElement("article");
    card.className = "comment-card";

    const header = document.createElement("div");
    header.className = "d-flex justify-content-between align-items-baseline mb-2";

    const author = document.createElement("strong");
    author.className = "comment-author";

    const icon = document.createElement("i");
    icon.className = "bi bi-person-circle icon-accent me-2";
    icon.setAttribute("aria-hidden", "true");

    author.appendChild(icon);
    author.appendChild(document.createTextNode(comment.name));

    const date = document.createElement("small");
    date.className = "text-secondary me-2";
    date.textContent = comment.date;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "btn btn-outline-danger btn-sm comment-delete";
    deleteButton.setAttribute("aria-label", "Smazat komentář od " + comment.name);
    deleteButton.title = "Smazat komentář";
    deleteButton.addEventListener("click", onDelete);

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-trash";
    deleteIcon.setAttribute("aria-hidden", "true");

    deleteButton.appendChild(deleteIcon);

    const meta = document.createElement("div");
    meta.className = "d-flex align-items-center flex-shrink-0 ms-2";

    meta.appendChild(date);
    meta.appendChild(deleteButton);

    header.appendChild(author);
    header.appendChild(meta);

    const text = document.createElement("p");
    text.className = "mb-0 comment-text";
    text.textContent = comment.text;

    card.appendChild(header);
    card.appendChild(text);

    return card;

}


function renderComments(comments) {

    list.replaceChildren();

    comments.forEach(function (comment, index) {

        list.appendChild(createCommentElement(comment, function () {
            deleteComment(index);
        }));

    });

    emptyMessage.classList.toggle("d-none", comments.length > 0);

}


// Smazání komentáře na dané pozici. Po každém smazání se seznam
// vykreslí znovu, takže pozice v tlačítkách zůstanou správné.
function deleteComment(index) {

    comments = comments.filter(function (comment, i) {
        return i !== index;
    });

    saveComments(comments);
    renderComments(comments);

}


let comments = loadComments();

renderComments(comments);


form.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = nameInput.value.trim();
    const text = textInput.value.trim();

    if (!name || !text) {

        form.classList.add("was-validated");

        // Prázdné pole s mezerami nesmí projít, proto se vyprázdní.
        if (!name) {
            nameInput.value = "";
        }

        if (!text) {
            textInput.value = "";
        }

        return;

    }

    const newComment = {
        name: name.slice(0, MAX_NAME),
        text: text.slice(0, MAX_TEXT),
        date: new Date().toLocaleDateString("cs-CZ")
    };

    // Nejnovější komentář je nahoře.
    comments = [newComment].concat(comments).slice(0, MAX_COMMENTS);

    saveComments(comments);
    renderComments(comments);

    form.reset();
    form.classList.remove("was-validated");

});
