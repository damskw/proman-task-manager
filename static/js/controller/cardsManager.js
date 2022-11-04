import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {itemsManager} from "./itemsManager.js";

export let cardsManager = {
    loadPublicCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.publicCard);
            const content = cardBuilder(card);
            domManager.addChild(`.cards-container[data-board-cards-container-id="${boardId}"]`, content);
            await itemsManager.loadPublicItems(card.id);
        }
    },
    loadManageableCards: async function (boardId) {
        const cards = await dataHandler.getCardsByBoardId(boardId);
        for (let card of cards) {
            const cardBuilder = htmlFactory(htmlTemplates.manageableCard);
            const content = cardBuilder(card);
            domManager.addChild(`.cards-container[data-board-cards-container-id="${boardId}"]`, content);
            await itemsManager.loadManageableItems(card.id);
            addCardsDefaultEventListeners(card.id);
        }
    },
    addItem,
    addCardsDefaultEventListeners,
};

function addCardsDefaultEventListeners(cardId) {
    domManager.addEventListener(
        `.transparent-button[data-add-item-button-card-id="${cardId}"]`,
        "click",
        addItem
    );
    domManager.addEventListener(
        `.card-name[data-card-name-id="${cardId}"]`,
        "click",
        revealEditCardNameForm
    );
    domManager.addEventListener(
        `#delete-card-button[data-delete-card-button-id="${cardId}"]`,
        "click",
        deleteCard
    )
}

async function addItem(clickEvent) {
    const cardId = clickEvent.target.dataset.addItemButtonCardId;
    const items = await dataHandler.createNewItem(cardId);
    items.forEach(item => {
        const itemBuilder = htmlFactory(htmlTemplates.manageableItem);
        const content = itemBuilder(item);
        domManager.addChild(`.single-card-item-section[data-card-id-item-section="${cardId}"]`, content);
        itemsManager.addItemsDefaultEventListeners(item.id)
    })
}

function revealEditCardNameForm(clickEvent) {
    const cardId = clickEvent.target.dataset.cardNameId;
    const cardHeaderWrapper = document.querySelector(`.card-header-wrapper[data-card-header-id="${cardId}"]`);
    const cardName = document.querySelector(`.card-name[data-card-name-id="${cardId}"]`)
    const form = document.querySelector(`.card-edit-form[data-form-edit-card-id="${cardId}"]`);
    const formWrapper = document.querySelector(`.edit-card-name-wrapper[data-edit-card-name-id="${cardId}"]`);
    cardHeaderWrapper.classList.add("hide-display");
    formWrapper.classList.add("show-display");
    form.addEventListener("submit", async function (e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target).entries());
        if (data["card-title"]) {
            await dataHandler.changeCardName(cardId, data["card-title"]);
            cardName.innerText = data["card-title"];
        }
        cardHeaderWrapper.classList.remove("hide-display");
        formWrapper.classList.remove("show-display");
        form["card-title"].style.color = "gray";
    })
}

async function deleteCard(clickEvent) {
    const cardId = clickEvent.target.dataset.deleteCardButtonId;
    const card = document.querySelector(`.single-card[data-card-id="${cardId}"]`);
    await dataHandler.deleteCard(cardId);
    card.remove();
}
