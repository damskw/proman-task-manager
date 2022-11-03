import {boardsManager} from "./controller/boardsManager.js";
import {pageManager} from "./controller/pageManager.js";

async function init() {
    pageManager.preLoadPage()
    await boardsManager.loadBoards();
    pageManager.loadPageContent()
    pageManager.activateNavBar();
    pageManager.activateNewBoardButton();
    pageManager.activateArrows();
    pageManager.activateLoginLogoutButtons();
}



init();
