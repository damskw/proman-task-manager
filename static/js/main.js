import {boardsManager} from "./controller/boardsManager.js";
import {domManager} from "./view/domManager.js";

function init() {
    boardsManager.loadBoards();
    activateNavBar();
}

function activateNavBar() {
    domManager.addEventListener("#user-profile-icon", "click", toggleNavBarMenu);
}

function toggleNavBarMenu() {
    let subMenu = document.querySelector("#subMenu");
    console.log(subMenu);
    subMenu.classList.toggle("open-menu");
}

init();
