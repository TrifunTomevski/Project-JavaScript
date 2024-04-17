import { initArtistHomePage } from "./artistHomePage.js";

export function updateHeader() {
    const header = document.querySelector("header");
    header.textContent = "Street ARTists";
}

export function initLandingPage() {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((users) => {
            const nameOptions = users.map((user) => user.name);
            console.log(nameOptions);

            const joinAsVisitor = document.querySelector(".joinAsVisitor");
            const visitor = document.querySelector(".visitor");
            const joinAsArtist = document.querySelector(".artist");
            const artists = document.querySelector("#artists");

            artists.innerHTML = "";
            artists.innerHTML += `<option value="">Choose</option>`;

            nameOptions.forEach((nameOption) => {
                artists.innerHTML += `<option value="${nameOption}">${nameOption}</option>`;
            });

            visitor.addEventListener("click", function () {
                location.hash = "visitorHomePage";
            });

            joinAsVisitor.addEventListener("click", function () {
                joinAsVisitor.click();
            });

            joinAsArtist.addEventListener("click", function (e) {
                artists.click();
            });

            initArtistHomePage();
        });

    updateHeader();
}

// Pop up Information Message
const popup = document.querySelector(".popup");
const x = document.querySelector(".popup-content h1");

window.addEventListener("load", () => {
    popup.classList.add("showPopup");
    popup.childNodes[1].classList.add("showPopup");
});
x.addEventListener("click", () => {
    popup.classList.remove("showPopup");
    popup.childNodes[1].classList.remove("showPopup");
});
