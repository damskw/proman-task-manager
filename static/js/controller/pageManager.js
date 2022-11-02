import {domManager} from "../view/domManager.js";
import {boardsManager} from "./boardsManager.js";
import {htmlFactory, htmlTemplates} from "../view/htmlFactory.js";
import {dataHandler} from "../data/dataHandler.js";

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
    }, activateLoginButton: function () {
        domManager.addEventListener(
            "#login-register-li",
            "click",
            openLoginRegisterModal
        )
    },
    preLoadPage,
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


function openLoginRegisterModal() {
    // if logged in then return? Or logout?
    const modalBuilder = htmlFactory(htmlTemplates.loginregister);
    const content = modalBuilder();
    domManager.addChild(".main-page", content);
    domManager.addEventListener(
        "#modal-close-button",
        "click",
        closeModal
    )
    openLoginModal();
}


function openLoginModal() {
    const loginBuilder = htmlFactory(htmlTemplates.login);
    const content = loginBuilder();
    domManager.addChild(".modal-content", content);
    const form = document.querySelector("#login-modal-form");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        initLogin();
        closeModal();
    })
    domManager.addEventListener(
        "#redirect-register",
        "click",
        closeLoginModal)
}

function openRegisterModal() {
    const registerBuilder = htmlFactory(htmlTemplates.register);
    const content = registerBuilder();
    domManager.addChild(".modal-content", content);
    const form = document.querySelector("#register-modal-form");
    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(e.target).entries());
        await initRegister(data);
    })
    domManager.addEventListener(
        "#redirect-login",
        "click",
        closeRegisterModal
    )
}

function initLogin() {

}

async function initRegister(data) {
    const registerNotification = document.querySelector("#register-notification");
    if (data["password"] !== data["repeat-password"]) {
        sendErrorNotification("Error: Passwords don't match.");
        return
    }
    const user = await dataHandler.registerUser(data["email"], data["password"]);
    if (user["email"]) {
        sendErrorNotification("Error: User with that email already exists.");
        return
    }
    closeModal()
}

function sendErrorNotification(notification) {
    const registerNotification = document.querySelector("#register-notification");
    registerNotification.style.display = "block";
    registerNotification.innerText = notification;
}

function closeModal() {
    const modal = document.querySelector("#modal-login-register");
    const modalInternal = document.querySelector(".modal-content");
    modalInternal.classList.add("animate-closing-modal");
    modalInternal.addEventListener("transitionend", (e) => {
        modal.remove();
    })

}

function closeLoginModal() {
    const loginModal = document.querySelector("#login-modal-form");
    loginModal.remove();
    openRegisterModal();
}

function closeRegisterModal() {
    const registerModal = document.querySelector("#register-modal-form");
    registerModal.remove();
    openLoginModal();
}
