// Import  and ROUTING
import { initArtistAuctionPage } from "./pages/artistAuctionPage.js";
import {
    initArtistCaptureImage,
    stopStream,
} from "./pages/artistCaptureImage.js";
import { initAddNewItemPage } from "./pages/addNewItemPage.js";
import { initArtistItemsPage } from "./pages/artistItemsPage.js";
import { initArtistHomePage } from "./pages/artistHomePage.js";
import {
    initVisitorListingPage,
    filterOutItems,
} from "./pages/visitorListingPage.js";
import { initVisitorHomePage } from "./pages/visitorHomePage.js";
import { initLandingPage } from "./pages/landingPage.js";

export function renderItem(options, element) {
    element.innerHTML = `<option value="">Choose</option>`;
    options.forEach((nameOption) => {
        element.innerHTML += `<option value="${nameOption}">${nameOption}</option>`;
    });
}

// API
fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())
    .then((users) => {
        localStorage.setItem("users", JSON.stringify(users));
    });

function handleRoute() {
    const hash = location.hash === "" ? "#landingPage" : location.hash;

    const allPages = document.querySelectorAll(".page");
    allPages.forEach((page) => (page.style.display = "none"));
    document.querySelector(hash).style.display = "block";

    if (hash !== "#artistCaptureImage") {
        stopStream();
    }

    // Every Page
    switch (hash) {
        case "#landingPage":
            initLandingPage();
            break;

        case "#visitorHomePage":
            initVisitorHomePage();
            break;

        case "#visitorListingPage":
            initVisitorListingPage();
            filterOutItems();
            break;

        case "#artistHomePage":
            initArtistHomePage();
            break;

        case "#artistItemsPage":
            initArtistItemsPage();
            break;

        case "#addNewItemPage":
            initAddNewItemPage();
            break;

        case "#artistCaptureImage":
            initArtistCaptureImage();
            break;

        case "#artistAuctionPage":
            initArtistAuctionPage();
            break;

        default:
            break;
    }
}

window.addEventListener("hashchange", handleRoute);
window.addEventListener("load", handleRoute);
