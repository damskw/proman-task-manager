import {boardsManager} from "../controller/boardsManager.js";
import {pageManager} from "../controller/pageManager.js";

export let loadPage = {
    init: async function (type) {
        pageManager.preLoadPage()
        if (type === "public") {
            await boardsManager.loadBoards();
        } else if (type === "private") {
            await boardsManager.loadPrivateBoards();
        }
        pageManager.loadPageContent()
        pageManager.activateNavBar();
        pageManager.activateNewBoardButton();
        pageManager.activateArrows();
        pageManager.activateLoginLogoutButtons();
    }

}