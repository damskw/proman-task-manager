import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {dragDropManager} from "./dragDropManager.js";

export let itemsManager = {
    loadManageableItems: async function (cardId) {
        const items = await dataHandler.getItemsByCardId(cardId);
        for (let item of items) {
            const itemBuilder = htmlFactory(htmlTemplates.manageableItem);
            const content = itemBuilder(item);
            domManager.addChild(`.single-card-item-section[data-card-id-item-section="${cardId}"]`, content);
            addItemsDefaultEventListeners(item.id);
            dragDropManager.initDraggable(item);
        }
    }, loadPublicItems: async function (cardId) {
        const items = await dataHandler.getItemsByCardId(cardId);
        for (let item of items) {
            const itemBuilder = htmlFactory(htmlTemplates.publicItem);
            const content = itemBuilder(item);
            domManager.addChild(`.single-card-item-section[data-card-id-item-section="${cardId}"]`, content);
        }
    },
    addItemsDefaultEventListeners,
};


function addItemsDefaultEventListeners(itemId) {
    domManager.addEventListener(
        `#delete-item-button[data-item-delete-button-id="${itemId}"]`,
        "click",
        deleteItem
    );
    domManager.addEventListener(
        `.item-name[data-item-name-id="${itemId}"]`,
        "click",
        revealEditItemNameForm
    )

}

async function deleteItem(clickEvent) {
    const itemId = clickEvent.target.dataset.itemDeleteButtonId;
    const item = document.querySelector(`.card-item[data-item-id="${itemId}"]`);
    await dataHandler.deleteItem(itemId);
    item.remove();
}

function revealEditItemNameForm(clickEvent) {
    const itemId = clickEvent.target.dataset.itemNameId;
    const cardItemWrapper = document.querySelector(`.card-item-wrapper[data-item-wrapper-id="${itemId}"]`);
    const itemName = document.querySelector(`.item-name[data-item-name-id="${itemId}"]`)
    const form = document.querySelector(`.edit-item-form[data-form-edit-item-id="${itemId}"]`);
    const formWrapper = document.querySelector(`.edit-item-form-wrapper[data-edit-form-item-wrapper-id="${itemId}"]`);
    cardItemWrapper.classList.add("hide-display");
    formWrapper.classList.add("show-display");
    form.addEventListener("submit", async function (e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target).entries());
        if (data["item-name"]) {
            await dataHandler.changeItemName(itemId, data["item-name"]);
            itemName.innerText = data["item-name"];
        }
        cardItemWrapper.classList.remove("hide-display");
        formWrapper.classList.remove("show-display");
        form["item-name"].style.color = "gray";
    })
}