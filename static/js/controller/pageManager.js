import {domManager} from "../view/domManager.js";
import {boardsManager} from "./boardsManager.js";

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
        console.log(boardArrows);
        boardArrows.forEach(arrow => {
            arrow.addEventListener("click", toggleBoard);
            console.log(arrow);
        })
    }
}


function toggleNavBarMenu() {
    let subMenu = document.querySelector("#subMenu");
    subMenu.classList.toggle("open-menu");
}

function toggleBoard(clickEvent) {
    const boardId = clickEvent.target.dataset.arrowBoardId;
    console.log(boardId);
    const board = document.querySelector(`.single-board[data-board-id="${boardId}"]`)
    clickEvent.target.classList.toggle("rotate-transition");
    board.classList.toggle("hide-board");
}