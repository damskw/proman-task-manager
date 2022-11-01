import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let itemsManager = {
    loadItems: async function (cardId) {
        const items = await dataHandler.getItemsByCardId(cardId);
        for (let item of items) {
            const itemBuilder = htmlFactory(htmlTemplates.item);
            const content = itemBuilder(item);
            domManager.addChild(`.single-card-item-section[data-card-id-item-section="${cardId}"]`, content);
            addItemsDefaultEventListeners(item.id);
        }
    }, addItemsDefaultEventListeners,
};


function addItemsDefaultEventListeners(itemId) {
    domManager.addEventListener(
        `#delete-item-button[data-item-delete-button-id="${itemId}"]`,
    "click",
        deleteItem
    );

}

async function deleteItem(clickEvent) {
    const itemId = clickEvent.target.dataset.itemDeleteButtonId;
    const item = document.querySelector(`.card-item[data-item-id="${itemId}"]`);
    await dataHandler.deleteItem(itemId);
    item.remove();
}
