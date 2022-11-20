import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";
import {itemsManager} from "./itemsManager.js";

export let dragDropManager = {
    initItemDraggable: function (itemId) {
        const item = document.querySelector(`.card-item[data-item-id="${itemId}"]`);
        item.setAttribute("draggable", true);
        item.addEventListener("dragstart", itemDragAndDropHandler.handleItemDragStart);
        item.addEventListener("dragend", itemDragAndDropHandler.handleItemDragEnd);
    },
    removeItemDraggable: function (itemId) {
        const item = document.querySelector(`.card-item[data-item-id="${itemId}"]`);
        item.setAttribute("draggable", false);
    },
    initCardDraggable: function (cardId) {
        const card = document.querySelector(`.single-card[data-card-id="${cardId}"]`);
        card.setAttribute("draggable", true);
        card.addEventListener("dragstart", cardDragAndDropHandler.handleCardDragStart);
        card.addEventListener("dragend", cardDragAndDropHandler.handleItemDragEnd);
    },
    initItemsDropZone: function (object) {
        const element = document.querySelector(`.single-card[data-card-id="${object["id"]}"]`);
        element.addEventListener("dragover", itemDragAndDropHandler.handleCardDragOver);
        element.addEventListener("dragleave", itemDragAndDropHandler.handleCardDragLeave);
        element.addEventListener("drop", itemDragAndDropHandler.handleItemDrop);
    },
    initCardsDropZone: function (object) {
        const element = document.querySelector(`.cards-container[data-board-cards-container-id="${object["id"]}"]`);
        element.addEventListener("dragover", itemDragAndDropHandler.handleCardDragOver);
        element.addEventListener("dragleave", itemDragAndDropHandler.handleCardDragLeave);
        element.addEventListener("drop", itemDragAndDropHandler.handleItemDrop);
    }
}

export const pageEnvironment = {
    dragged: null,
    draggedFrom: null,
    draggedId: null,
    draggedFromId: null,
}


const cardDragAndDropHandler = {
    handleCardDragStart: function (e) {
        pageEnvironment.dragged = e.currentTarget;
        pageEnvironment.draggedId = e.currentTarget.dataset.cardId;
        pageEnvironment.draggedFrom = e.currentTarget.parentNode;
        pageEnvironment.draggedFromId = e.currentTarget.parentNode.dataset.boardCardsContainerId;
    },
    handleCardDragEnd: function (e) {
        cardDragAndDropHandler.changeCardDragEndStyles(pageEnvironment.dragged);
        clearPageEnvironment();
    },
    changeCardDragStartStyles: function (element) {
        element.classList.add("item-drag-start");
    },
    changeCardDragEndStyles: function (element) {
        element.classList.remove("item-drag-start");
    },
    handleBoardDragOver: function (e) {

    },
    handleBoardDragLeave: function (e) {

    },
    handleCardDrop: function (e) {

    }
}


const itemDragAndDropHandler = {
    handleItemDragStart: function (e) {
        pageEnvironment.dragged = e.currentTarget;
        pageEnvironment.draggedId = e.currentTarget.dataset.itemId;
        pageEnvironment.draggedFrom = e.currentTarget.parentNode;
        pageEnvironment.draggedFromId = e.currentTarget.parentNode.dataset.cardIdItemSection;
        itemDragAndDropHandler.changeItemDragStartStyles(e.currentTarget);
    },
    handleItemDragEnd: function (e) {
        itemDragAndDropHandler.changeItemDragEndStyles(pageEnvironment.dragged);
        clearPageEnvironment();
    },
    changeItemDragStartStyles: function (element) {
        element.classList.add("item-drag-start");
    },
    changeItemDragEndStyles: function (element) {
        element.classList.remove("item-drag-start");
    },
    changeCardDragOverStyles: function (element) {
        element.classList.add("card-drag-over");
    },
    changeCardDragLeaveStyles: function (element) {
        element.classList.remove("card-drag-over");
    },
    handleCardDragOver: function (e) {
        e.preventDefault();
        itemDragAndDropHandler.changeCardDragOverStyles(e.currentTarget);
    },
    handleCardDragLeave: function (e) {
        itemDragAndDropHandler.changeCardDragLeaveStyles(e.currentTarget);
    },
    resetItemAttributes: function (itemId) {
        const item = document.querySelector(`.card-item[data-item-id="${itemId}"]`)
        itemsManager.addItemsDefaultEventListeners(itemId);
        item.setAttribute("draggable", true);
        item.addEventListener("dragstart", itemDragAndDropHandler.handleItemDragStart);
        item.addEventListener("dragend", itemDragAndDropHandler.handleItemDragEnd);
    },
    handleItemDrop: async function (e) {
        e.preventDefault();
        const dropZoneId = e.currentTarget.dataset.cardId;
        if (dropZoneId === pageEnvironment.draggedFromId || !pageEnvironment.dragged.classList.contains("card-item")) {
            itemDragAndDropHandler.changeCardDragLeaveStyles(e.currentTarget);
            return;
        }
        const dropZone = document.querySelector(`.single-card-item-section[data-card-id-item-section="${dropZoneId}"]`);
        dropZone.appendChild(pageEnvironment.dragged);
        itemDragAndDropHandler.changeItemDragEndStyles(pageEnvironment.dragged);
        itemDragAndDropHandler.resetItemAttributes(pageEnvironment.draggedId);
        itemDragAndDropHandler.changeCardDragLeaveStyles(e.currentTarget);
        await dataHandler.moveItem(dropZoneId, pageEnvironment.draggedId);
    }

}

function clearPageEnvironment() {
    pageEnvironment.dragged = null;
    pageEnvironment.draggedFrom = null;
    pageEnvironment.draggedId = null;
    pageEnvironment.draggedFromId = null;
}