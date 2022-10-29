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
    }
}


function toggleNavBarMenu() {
    let subMenu = document.querySelector("#subMenu");
    subMenu.classList.toggle("open-menu");
}