import { items } from "../../data/data.js";
import { renderArtistName } from "./navigation.js";

export function initAddNewItemPage() {
    renderArtistName();
}

// Variables
const addButton = document.querySelector(".buttonAdd");
const cancelButton = document.querySelector(".buttonCancel");
const newTitleInput = document.querySelector("#itemTitleNew");
const newDescInput = document.querySelector("#itemDescriptionNew");
const newTypeSelect = document.querySelector("#itemTypeNew");
const newPriceInput = document.querySelector("#priceItemNew");
const newImageUrlInput = document.querySelector("#imgURLnew");

// Add Button
addButton.addEventListener("click", () => {
    const newItemData = createNewItemData();
    addItemToLocalStorage(newItemData);
    navigateToArtistItemsPage();
    newTitleInput.value = "";
    newDescInput.value = "";
    newTypeSelect.value = "";
    newPriceInput.value = "";
    newImageUrlInput.value = "";
});

// Cancel button
cancelButton.addEventListener("click", () => {
    navigateToArtistItemsPage();
});

// New Item Creating
function createNewItemData() {
    const newItemData = {
        id: items.length + 1,
        title: newTitleInput.value,
        description: newDescInput.value,
        type: newTypeSelect.value,
        image: newImageUrlInput.value,
        price: parseInt(newPriceInput.value),
        artist: localStorage.getItem("artistName"),
        dateCreated: new Date().toISOString().substring(0, 10),
        isPublished: document.querySelector("#is_published").checked,
        isAuctioning: false,
        dateSold: null,
        priceSold: null,
    };
    return newItemData;
}

// Local Storage
function addItemToLocalStorage(newItemData) {
    const artistItems = JSON.parse(localStorage.getItem("items"));
    artistItems.unshift(newItemData);
    localStorage.setItem("items", JSON.stringify(artistItems));
}

// Navigation
function navigateToArtistItemsPage() {
    location.hash = "#artistItemsPage";
}
