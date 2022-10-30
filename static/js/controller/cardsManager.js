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
            domManager.addEventListener(
                `.card-name[data-card-name-id="${card.id}"]`,
                "click",
                revealEditCardNameForm
            )
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

function revealEditCardNameForm(clickEvent) {
    const cardId = clickEvent.target.dataset.cardNameId;
    const cardName = document.querySelector(`.card-name[data-card-name-id="${cardId}"]`);
    const form = document.querySelector(`#card-edit-form[data-form-edit-card-id="${cardId}"]`);
    const formWrapper = document.querySelector(`.edit-card-name-wrapper[data-edit-card-name-id="${cardId}"]`);
    cardName.classList.add("hide-display");
    formWrapper.classList.add("show-display");
    form.addEventListener("submit", async function (e) {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.target).entries());
        if (data["card-title"]) {
            await dataHandler.changeCardName(cardId, data["card-title"]);
            cardName.innerText = data["card-title"];
        }
        cardName.classList.remove("hide-display");
        formWrapper.classList.remove("show-display");
        form["card-title"].style.color = "gray";
    })
}
