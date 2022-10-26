import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            domManager.addEventListener(
                `.page-button[data-new-card-board-id="${board.id}"]`,
                "click",
                addCard
            );
            await cardsManager.loadCards(board.id);
        }

    },
};

async function addCard(clickEvent) {
    const boardId = clickEvent.target.dataset.newCardBoardId;
    const cards = await dataHandler.createEmptyCard(boardId);
    cards.forEach(card => {
        const cardBuilder = htmlFactory(htmlTemplates.card);
        const content = cardBuilder(card);
        domManager.addChild(`.cards-container[data-board-cards-container-id="${boardId}"]`, content);
    })


    // const cardBuilder = htmlFactory(htmlTemplates.card);
    // const content = cardBuilder(card);
    // console.log(boardId)
}
