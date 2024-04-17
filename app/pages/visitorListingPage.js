import { items, itemTypes } from "../../data/data.js";
import { renderItem } from "../main.js";

export function filterOutItems(filter = {}) {
    const visitorCardContainer = document.querySelector(
        "#visitorCardContainer"
    );

    const itemsFromLocalStorage = localStorage.getItem("items");
    console.log(itemsFromLocalStorage);
    const publishedItems = items.filter((item) => item.isPublished);
    const title = filter.title ?? "";
    const artist = filter.artist ?? "";
    const minPrice = filter.minPrice ?? 0;
    const maxPrice = filter.maxPrice ?? 0;
    const type = filter.type ?? "";

    const filtered = publishedItems.filter(
        (item) =>
            (title
                ? item.title.toLowerCase().includes(title.toLowerCase())
                : true) &&
            (artist ? item.artist === artist : true) &&
            (minPrice ? item.price >= minPrice : true) &&
            (maxPrice ? item.price <= maxPrice : true) &&
            (type ? item.type === type : true)
    );

    visitorCardContainer.innerHTML = "";
    filtered.forEach(({ image, title, description, price, artist }, idx) => {
        // Card
        const evenOdd = idx % 2 ? "dark" : "light";
        visitorCardContainer.innerHTML += `<div class="card visitor-card-${evenOdd}">
        <img class="card-img-top" src="${image}" alt="${title}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start">
            <p class="card-text card-artist">${artist}</p>
            <a href="#" class="btn btn-price d-flex justify-content-center align-items-center">$${price}</a>
          </div>
          <h5 class="card-title">${title}</h5>
          <p class="card-text card-info">${description}</p>
        </div>
      </div>`;
    });
}

export function initVisitorListingPage() {
    // Variables
    const filterButton = document.querySelector(".btn-filter");
    const filterPanel = document.querySelector("#filterPanel");
    const filterCloseButton = document.querySelector(".btn-close-filter");
    const filterDoneButton = document.querySelector(".btn-done-filter");

    const titleInput = document.querySelector(".title-input");
    const minPriceInput = document.querySelector(".min-price-input");
    const maxPriceInput = document.querySelector(".max-price-input");
    const artistsFilter = document.querySelector("#artists-filter");
    const typesFilter = document.querySelector("#types-filter");

    const users = JSON.parse(localStorage.getItem("users"));

    const nameOptions = users.map((user) => user.name);
    renderItem(nameOptions, artistsFilter);
    renderItem(itemTypes, typesFilter);

    // Filtering Button
    filterButton.addEventListener("click", () => {
        filterPanel.style.right =
            filterPanel.style.right === "0%" ? "-100%" : "0%";
        if (filterPanel.style.right !== "0%") {
            const filter = {
                title: titleInput.value,
                artist: artistsFilter.value,
                minPrice: minPriceInput.value,
                maxPrice: maxPriceInput.value,
                type: typesFilter.value,
            };

            filterOutItems(filter);
        }
        filterPanel.classList.toggle("open");
        filterButton.classList.toggle("open");
    });

    // Filter Close
    filterCloseButton.addEventListener("click", () => {
        filterPanel.style.right = "-100%";
        filterPanel.classList.remove("open");
        filterButton.classList.remove("open");
    });

    // Filter Save
    filterDoneButton.addEventListener("click", () => {
        filterPanel.style.right = "-100%";
        filterPanel.classList.remove("open");
        filterButton.classList.remove("open");
    });

    filterOutItems();
}
