import {boardsManager} from "./controller/boardsManager.js";
import {pageManager} from "./controller/pageManager.js";
import {domManager} from "./view/domManager.js";

function init() {
    boardsManager.loadBoards();
    pageManager.activateNavBar();
    pageManager.activateNewBoardButton();
}



init();
