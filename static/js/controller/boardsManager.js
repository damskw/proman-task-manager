import {dataHandler} from "../data/dataHandler.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {domManager} from "../view/domManager.js";
import {cardsManager} from "./cardsManager.js";
import {pageManager} from "./pageManager.js";

export let boardsManager = {
    loadBoards: async function () {
        const boards = await dataHandler.getBoards();
        for (let board of boards) {
            const boardBuilder = htmlFactory(htmlTemplates.board);
            const content = boardBuilder(board);
            domManager.addChild("#root", content);
            addBoardDefaultEventListeners(board.id);
            await cardsManager.loadCards(board.id);
        }
    }, createNewBoard: async function () {
        const newBoardTitle = "New board";
        const board = await dataHandler.createNewBoard(newBoardTitle);
        const boardBuilder = htmlFactory(htmlTemplates.board);
        const content = boardBuilder(board);
        domManager.addChild("#root", content);
        addBoardDefaultEventListeners(board.id);
        await createDefaultCards(board.id);
        pageManager.activateArrows();
    }
};

async function createDefaultCards(boardId) {
    const defaultCardTitles = ["New", "In Progress", "Testing", "Done"];
    for (const cardTitle of defaultCardTitles) {
        const card = await dataHandler.createEmptyCard(boardId, cardTitle);
        const cardBuilder = htmlFactory(htmlTemplates.card);
        const content = cardBuilder(card);
        domManager.addChild(`.cards-container[data-board-cards-container-id="${boardId}"]`, content);
        cardsManager.addCardsDefaultEventListeners(card.id);
    }
}

function addBoardDefaultEventListeners(boardId) {
    domManager.addEventListener(
        `.page-button[data-new-card-board-id="${boardId}"]`,
        "click",
        addCard
    );
    domManager.addEventListener(
        `.board-name[data-board-title-id="${boardId}"]`,
        "click",
        revealEditBoardTitleForm
    );
    domManager.addEventListener(
        `#trash-icon-delete-board[data-board-delete-icon-id="${boardId}"]`,
        "click",
        openConfirmationModal
    )
}

async function addCard(clickEvent) {
    const cardTitle = "new card";
    const boardId = clickEvent.target.dataset.newCardBoardId;
    const card = await dataHandler.createEmptyCard(boardId, cardTitle);
    const cardBuilder = htmlFactory(htmlTemplates.card);
    const content = cardBuilder(card);
    domManager.addChild(`.cards-container[data-board-cards-container-id="${boardId}"]`, content);
    await cardsManager.addCardsDefaultEventListeners(card.id)
}

function revealEditBoardTitleForm(clickEvent) {
    const boardId = clickEvent.target.dataset.boardTitleId;
    const boardTitle = document.querySelector(`.board-name[data-board-title-id="${boardId}"]`);
    const form = document.querySelector(`.edit-title-form[data-edit-board-name-id="${boardId}"]`);
    boardTitle.classList.add("hide-display");
    form.classList.add("show-display");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        if (data["board-title"]) {
            await dataHandler.changeBoardTitle(boardId, data["board-title"]);
            boardTitle.innerText = data["board-title"];
        }
        boardTitle.classList.remove("hide-display");
        form.classList.remove("show-display");
        form["board-title"].style.color = "gray";
    })
}

function openConfirmationModal(clickEvent) {
    const modalBuilder = htmlFactory(htmlTemplates.deleteModal);
    const content = modalBuilder()
    domManager.addChild("#root", content);
    const boardId = clickEvent.target.dataset.boardDeleteIconId;
    const yesButton = document.querySelector("#yes-delete-button");
    yesButton.boardId = boardId;
    const confirmationModal = document.querySelector("#modal-delete-confirmation");
    confirmationModal.style.display = "block";
    domManager.addEventListener(
        "#modal-close-button",
        "click",
        closeModal
    )
    domManager.addEventListener(
        "#yes-delete-button",
        "click",
        initDeleteBoard
    )
    domManager.addEventListener(
        "#no-delete-button",
        "click",
        closeModal
    )
}


function closeModal() {
    const confirmationModal = document.querySelector("#modal-delete-confirmation");
    const modalInternal = document.querySelector(".modal-content");
    modalInternal.classList.add("animate-closing-modal");
    modalInternal.addEventListener("transitionend", (e) => {
        confirmationModal.remove();
    })
}

async function initDeleteBoard(clickEvent) {
    closeModal();
    await dataHandler.deleteBoard(clickEvent.target.boardId)
    domManager.removeEventListener(
        "#modal-close-button",
        "click",
        closeModal
    )
    domManager.removeEventListener(
        "#yes-delete-button",
        "click",
        initDeleteBoard
    )
    domManager.removeEventListener(
        "#no-delete-button",
        "click",
        closeModal
    )
    document.location.reload();
}