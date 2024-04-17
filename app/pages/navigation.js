import { getCurrentArtist } from "../globals.js";

// Navigation
export function initNavigation() {
    const barsBtn = document.querySelectorAll(".barsBtn");
    const dropdownList = document.querySelectorAll(".navList");

    barsBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const dropdownNav = btn.parentElement.nextElementSibling;
            dropdownNav.classList.toggle("active");
        });
    });

    dropdownList.forEach((dropD) => {
        dropD.addEventListener("click", () => {
            dropD.classList.remove("active");
        });
    });
}
export function renderArtistName() {
    const artistName = getCurrentArtist();
    const navTitle = document.querySelectorAll(".artistName");

    if (artistName) {
        navTitle.forEach((title) => (title.textContent = artistName));
    } else {
        location.hash = "";
        return;
    }
}

// Filter
export function openFilterPanel() {
    const filterButton = document.querySelector(".btn-filter");
    const filterPanel = document.querySelector("#filterPanel");
    const filterCloseButton = document.querySelector(".btn-close-filter");

    filterButton.addEventListener("click", () => {
        filterPanel.style.right =
            filterPanel.style.right === "0%" ? "-100%" : "0%";

        filterPanel.classList.toggle("open");
        filterButton.classList.toggle("open");
    });

    filterCloseButton.addEventListener("click", () => {
        filterPanel.style.right = "-100%";
        filterPanel.classList.remove("open");
        filterButton.classList.remove("open");
    });
}

// Carousel
export function carouselSlide() {
    const slidesWrapper = document.querySelector(".carousel_slides-wrapper");
    const slides = Array.from(slidesWrapper.children);
    const nextBtn = document.querySelector(".carousel_button--right");
    const prevBtn = document.querySelector(".carousel_button--left");
    let slideWidth = slides[0].getBoundingClientRect().width;

    const setSlidePosition = (array, slidesWrapper) => {
        slideWidth = array[0].getBoundingClientRect().width;
        array.forEach((sl, idx) => (sl.style.left = slideWidth * idx + "px"));
        const currentSlide = document.querySelector(".current-slide");
        slidesWrapper.style.transform = `translateX(-${currentSlide.style.left})`;
    };
    setSlidePosition(slides, slidesWrapper);

    const moveToSlide = (
        slidesWrapper,
        currentSlide,
        targetSlide,
        goToSlide
    ) => {
        if (slidesWrapper.style.transition === "none 0s ease 0s") {
            slidesWrapper.style.transition = "transform 0.25s ease";
        }

        if (targetSlide) {
            const amountToMove = targetSlide.style.left;
            slidesWrapper.style.transform = `translateX(-${amountToMove})`;
            targetSlide.classList.add("current-slide");
        } else {
            const amountToMove = goToSlide.style.left;
            slidesWrapper.style.transform = `translateX(-${amountToMove})`;
            goToSlide.classList.add("current-slide");
        }

        currentSlide.classList.remove("current-slide");
    };

    const hideNotCurrSlides = () => {
        const notCurrentSlides = document.querySelectorAll(
            "li:not(.current-slide)"
        );
        const currentSlide = document.querySelector(".current-slide");
        notCurrentSlides.forEach((el) => (el.style.opacity = 0));
        currentSlide.style.opacity = 1;
    };

    // Next Button Carousel
    nextBtn.addEventListener("click", () => {
        const currentSlide = document.querySelector(".current-slide");
        const nextSlide = currentSlide.nextElementSibling;
        const firstSlide = slidesWrapper.firstElementChild;
        moveToSlide(slidesWrapper, currentSlide, nextSlide, firstSlide);
        hideNotCurrSlides();
    });

    // Previous Button Carousel
    prevBtn.addEventListener("click", () => {
        const currentSlide = document.querySelector(".current-slide");
        const prevSlide = currentSlide.previousElementSibling;
        const lastSlide = slidesWrapper.lastElementChild;
        moveToSlide(slidesWrapper, currentSlide, prevSlide, lastSlide);
        hideNotCurrSlides();
    });

    const onResize = () => {
        setSlidePosition(slides, slidesWrapper);
        if (!(slidesWrapper.style.transition = "none")) {
            slidesWrapper.style.transition = "none";
        }
    };

    window.addEventListener("resize", () => {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(function () {
            onResize();
        }, 100);
    });
}
