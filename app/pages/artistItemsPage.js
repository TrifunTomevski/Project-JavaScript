import { formatDate } from "../utils/dates.js";
import { renderArtistName } from "./navigation.js";

// Variables
const newTitleInput = document.querySelector("#itemTitleNew");
const newDescInput = document.querySelector("#itemDescriptionNew");
const newTypeSelect = document.querySelector("#itemTypeNew");
const newPriceInput = document.querySelector("#priceItemNew");
const newImageUrlInput = document.querySelector("#imgURLnew");

export function initArtistItemsPage() {
    renderArtistName();

    const artistCardContainer = document.querySelector("#artistCardContainer");
    const artistItems = JSON.parse(localStorage.getItem("items"));

    const renderCard = (
        id,
        { image, title, description, price, dateCreated },
        cardParent
    ) => {
        // Card
        const card = `<div class="cardWrapper artist-card-${id}">
    <div class="card">
      <img class="card-img-top" src="${image}" alt="${title}">
      <div class="card-body">
        <div class="name-price">
          <div>
            <h5 class="card-title">${title}</h5>
            <p class="date">${formatDate(dateCreated)}</p>
          </div>
          <button class="price">$${price}</button>
        </div>
        <p class="card-text card-info">${description}</p>
      </div>
      <div class="card-buttons">
        <button class="btn send-to-auc disabled">Send to Auction</button>
        <button class="btn publish"></button>
        <button class="btn remove">Remove</button>
        <button class="btn edit">Edit</button>
      </div>
    </div>
  </div>`;

        cardParent.innerHTML += card;

        const publishButtons = document.querySelectorAll(
            ".card-buttons .publish"
        );

        publishButtons.forEach((publishButton, index) => {
            const item = artistItems[index];

            // Publish button
            if (item.isPublished) {
                publishButton.textContent = "Unpublish";
                publishButton.classList.add("publish");
            } else {
                publishButton.textContent = "Publish";
                publishButton.classList.add("unpublish");
            }

            publishButton.addEventListener("click", () => {
                if (item.isPublished) {
                    publishButton.classList.remove("publish");
                    publishButton.classList.add("unpublish");
                    publishButton.textContent = "Publish";
                    item.isPublished = false;
                } else {
                    publishButton.classList.remove("unpublish");
                    publishButton.classList.add("publish");
                    publishButton.textContent = "Unpublish";
                    item.isPublished = true;
                }
                localStorage.setItem("items", JSON.stringify(artistItems));
            });
        });

        // Variables
        const confirmScreen = document.querySelector(".confirm-screen");
        const confirmPopup = document.querySelector(".confirm-popup");
        const confirmBtn = confirmPopup.querySelector(".confirm");
        const cancelBtn = confirmPopup.querySelector(".cancel");
        const removeBtn = document.querySelectorAll(".remove");

        // Remove Button
        removeBtn.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const cardWrapper = btn.closest(".cardWrapper");

                confirmScreen.classList.add("active");
                confirmPopup.classList.add("active");

                confirmBtn.addEventListener("click", function () {
                    cardWrapper.remove();

                    confirmScreen.classList.remove("active");
                    confirmPopup.classList.remove("active");
                });

                cancelBtn.addEventListener("click", function () {
                    confirmScreen.classList.remove("active");
                    confirmPopup.classList.remove("active");
                });
            });
        });

        // Edit Button
        const editButtons = document.querySelectorAll(".edit");
        editButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                const item = artistItems[index];
                const itemId = parseInt(button.dataset.itemId);
                localStorage.setItem("editItemId", itemId);
                location.hash = "addNewItemPage";
                newTitleInput.value = item.title;
                newDescInput.value = item.description;
                newTypeSelect.value = item.type;
                newPriceInput.value = item.price;
                newImageUrlInput.value = item.image;
            });
        });
    };

    const renderAllCards = (cardsArr, cardsParent) => {
        cardsParent.innerHTML = "";
        cardsArr.forEach((item, id) => {
            renderCard(id, item, cardsParent);
        });
    };

    renderAllCards(artistItems, artistCardContainer);
}
