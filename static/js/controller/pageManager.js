import {domManager} from "../view/domManager.js";
import {boardsManager} from "./boardsManager.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";

export let pageManager = {
    activateNavBar: function () {
        domManager.addEventListener(
            "#user-profile-icon",
            "click",
            toggleNavBarMenu
        );
    }, activateNewBoardButton: function () {
        domManager.addEventListener(
            "#new-board-button",
            "click",
            boardsManager.createNewBoard
        );
    }, activateArrows: function () {
        const boardArrows = document.querySelectorAll(".board-name-arrow");
        boardArrows.forEach(arrow => {
            arrow.addEventListener("click", toggleBoard);
        })
    }, preLoadPage,
    loadPageContent,
}


function toggleNavBarMenu() {
    let subMenu = document.querySelector("#subMenu");
    subMenu.classList.toggle("open-menu");
}

function toggleBoard(clickEvent) {
    const boardId = clickEvent.target.dataset.arrowBoardId;
    const board = document.querySelector(`.single-board[data-board-id="${boardId}"]`)
    clickEvent.target.classList.toggle("rotate-transition");
    board.classList.toggle("hide-board");
}

function preLoadPage() {
    const pageContent = document.querySelector(".center-all-content");
    const spinnerBuilder = htmlFactory(htmlTemplates.spinner);
    const content = spinnerBuilder();
    domManager.addChild(".spinner-wrapper", content);
    pageContent.style.display = "none";
}

function loadPageContent() {
    const pageContent = document.querySelector(".center-all-content");
    const spinner = document.querySelector(".spinner-position");
    spinner.remove();
    pageContent.style.display = "flex";
}