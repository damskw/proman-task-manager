import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {itemsManager} from "./itemsManager.js";

export let cardsManager = {
    loadCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.cards-container[data-board-cards-container-id="${boardId}"]`, content);
            await itemsManager.loadItems(card.id);
            domManager.addEventListener(
                `.transparent-button[data-add-item-button-card-id="${card.id}"]`,
                "click",
                addItem
            );
        }
    }, addItem,
};

async function addItem(clickEvent) {
    const cardId = clickEvent.target.dataset.addItemButtonCardId;
    const items = await dataHandler.createNewItem(cardId);
    items.forEach(item => {
        const itemBuilder = htmlFactory(htmlTemplates.item);
        const content = itemBuilder(item);
        domManager.addChild(`.single-card-item-section[data-card-id-item-section="${cardId}"]`, content);
    })
}
