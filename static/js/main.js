import {boardsManager} from "./controller/boardsManager.js";
import {pageManager} from "./controller/pageManager.js";
import {domManager} from "./view/domManager.js";

async function init() {
    await boardsManager.loadBoards();
    pageManager.activateNavBar();
    pageManager.activateNewBoardButton();
    pageManager.activateArrows();
}



init();
