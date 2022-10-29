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
            domManager.addEventListener(
                `.board-name[data-board-title-id="${board.id}"]`,
                "click",
                revealEditBoardTitleForm
            );
            await cardsManager.loadCards(board.id);
        }
    }, createNewBoard: async function () {
        const newBoardTitle = "New board";
        const board = await dataHandler.createNewBoard(newBoardTitle);
        const boardBuilder = htmlFactory(htmlTemplates.board);
        const content = boardBuilder(board);
        domManager.addChild("#root", content);
        domManager.addEventListener(
            `.page-button[data-new-card-board-id="${board.id}"]`,
            "click",
            addCard
        );
        domManager.addEventListener(
            `.board-name[data-board-title-id="${board.id}"]`,
            "click",
            revealEditBoardTitleForm
        );
        const defaultCardTitles = ["New", "In Progress", "Testing", "Done"];
        for (const cardTitle of defaultCardTitles) {
            const card = await dataHandler.createEmptyCard(board.id, cardTitle);
            const cardBuilder = htmlFactory(htmlTemplates.card);
            const content = cardBuilder(card);
            domManager.addChild(`.cards-container[data-board-cards-container-id="${board.id}"]`, content);
            domManager.addEventListener(
                `.transparent-button[data-add-item-button-card-id="${card.id}"]`,
                "click",
                cardsManager.addItem
            );
        }
    }
};

async function addCard(clickEvent) {
    const cardTitle = "new card";
    const boardId = clickEvent.target.dataset.newCardBoardId;
    const card = await dataHandler.createEmptyCard(boardId, cardTitle);
    const cardBuilder = htmlFactory(htmlTemplates.card);
    const content = cardBuilder(card);
    domManager.addChild(`.cards-container[data-board-cards-container-id="${boardId}"]`, content);
    domManager.addEventListener(
        `.transparent-button[data-add-item-button-card-id="${card.id}"]`,
        "click",
        cardsManager.addItem
    );
}

function revealEditBoardTitleForm(clickEvent) {
    const boardId = clickEvent.target.dataset.boardTitleId;
    const boardTitle = document.querySelector(`.board-name[data-board-title-id="${boardId}"]`);
    const form = document.querySelector(`#edit-title-form[data-edit-board-name-id="${boardId}"]`);
    boardTitle.classList.add("hide-display");
    form.classList.add("show-display");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        await dataHandler.changeBoardTitle(boardId, data["board-title"]);
        boardTitle.innerText = data["board-title"];
        boardTitle.classList.remove("hide-display");
        form.classList.remove("show-display");
        form["board-title"].style.color = "gray";
    })
}
