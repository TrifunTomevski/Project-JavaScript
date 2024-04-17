import { items } from "../../data/data.js";
import { setCurrentArtists } from "../globals.js";
import { initNavigation, renderArtistName } from "./navigation.js";
import { initChart } from "./chart.js";

initNavigation();

export function initArtistHomePage() {
    // local Storage
    const artistName = localStorage.getItem("artist");
    const artistItems = items.filter((item) => item.artist === artistName);
    localStorage.setItem("items", JSON.stringify(artistItems));

    const artistSelect = document.querySelector("#artists");
    const auctionWrapper = document.querySelector(".auctionWrapper");

    artistSelect.addEventListener("change", function (e) {
        const currentArtist = e.target.value;
        setCurrentArtists(currentArtist);

        location.hash = "artistHomePage";
    });

    auctionWrapper.addEventListener("click", function () {
        location.hash = "artistAuctionPage";
    });

    renderArtistName();
    initChart();
}
