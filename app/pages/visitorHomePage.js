import { carouselSlide } from "./navigation.js";

export function initVisitorHomePage() {
    carouselSlide();
    location.hash = "#visitorHomePage";

    const auctionBtns = document.querySelectorAll(".auctionBtn");
    auctionBtns.forEach((auctionBtn) => {
        addHashListener(auctionBtn, "#artistAuctionPage");
    });

    const callToActionBtn = document.querySelector(".callToAction");
    const imagesSliderTop = document.querySelector(".sliderWrapper .top");
    const imagesSliderBottom = document.querySelector(".sliderWrapper .bottom");

    function addHashListener(element, targetHash) {
        element.addEventListener("click", function () {
            location.hash = targetHash;
        });
    }

    addHashListener(callToActionBtn, "#visitorListingPage");
    addHashListener(imagesSliderTop, "#visitorListingPage");
    addHashListener(imagesSliderBottom, "#visitorListingPage");
}
