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
    }, activateLoginLogoutButtons: function () {
        domManager.addEventListenerIfExists(
            "#login-register-li",
            "click",
            openLoginRegisterModal
        )
        domManager.addEventListenerIfExists(
            "#logout-li",
            "click",
            logout
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

async function logout() {
    await dataHandler.logoutUser();
    window.location.href = '/';
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
        initLogin(data);
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

async function initLogin(data) {
    const user = await dataHandler.loginUser(data["email"], data["password"]);
    if (!user["email"]) {
        sendLoginErrorNotification("Error: User with that email not found. Do you want to register?");
        return
    }
    if (!user["password"]) {
        sendLoginErrorNotification("Error: Invalid password, try again.");
        return
    }
    closeModal()
    window.location.href = '/';
}

async function initRegister(data) {
    if (data["password"] !== data["repeat-password"]) {
        sendRegisterErrorNotification("Error: Passwords don't match.");
        return
    }
    const user = await dataHandler.registerUser(data["email"], data["password"]);
    if (user["email"]) {
        sendRegisterErrorNotification("Error: User with that email already exists.");
        return
    }
    closeModal()
}

function sendRegisterErrorNotification(notification) {
    const registerNotification = document.querySelector("#register-notification");
    registerNotification.style.display = "block";
    registerNotification.innerText = notification;
}

function sendLoginErrorNotification(notification) {
    const loginNotification = document.querySelector("#login-notification");
    loginNotification.style.display = "block";
    loginNotification.innerText = notification;
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
