import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";

export let itemsManager = {
    loadItems: async function (cardId) {
        const items = await dataHandler.getItemsByCardId(cardId);
        for (let item of items) {
            const itemBuilder = htmlFactory(htmlTemplates.item);
            const content = itemBuilder(item);
            domManager.addChild(`.single-card[data-card-id="${cardId}"]`, content);
            // domManager.addEventListener(
            //     `.card[data-card-id="${card.id}"]`,
            //     "click",
            //     deleteButtonHandler
            // );
        }
    },
};