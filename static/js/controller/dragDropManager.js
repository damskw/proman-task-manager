import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";
import {itemsManager} from "./itemsManager.js";

export let dragDropManager = {
    initDraggable: function (object) {
        const item = "item_order" in object ? document.querySelector(`.card-item[data-item-id="${object["id"]}"]`) : document.querySelector(`.single-card[data-card-id="${object["id"]}"]`);
        item.setAttribute("draggable", true);
        item.addEventListener("dragstart", itemDragAndDropHandler.handleItemDragStart);
        item.addEventListener("dragend", itemDragAndDropHandler.handleItemDragEnd);
    },
    initDropZone: function (object) {
        const element = "card_order" in object ? document.querySelector(`.single-card[data-card-id="${object["id"]}"]`) : document.querySelector(`.single-card[data-card-id="${object["id"]}"]`)
        element.addEventListener("dragover", itemDragAndDropHandler.handleCardDragOver);
        element.addEventListener("dragleave", itemDragAndDropHandler.handleCardDragLeave);
        element.addEventListener("drop", itemDragAndDropHandler.handleItemDrop);
    },
}

export const pageEnvironment = {
    dragged: null,
    draggedFrom: null,
    draggedId: null,
    draggedFromId: null,
}

const itemDragAndDropHandler = {
    handleItemDragStart: function (e) {
        pageEnvironment.dragged = e.currentTarget;
        pageEnvironment.draggedId = e.currentTarget.dataset.itemId
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
        if (dropZoneId === pageEnvironment.draggedFromId) {
            itemDragAndDropHandler.changeCardDragLeaveStyles(e.currentTarget);
            return;
        }
        itemDragAndDropHandler.changeItemDragEndStyles(pageEnvironment.dragged);
        domManager.addChild(`.single-card-item-section[data-card-id-item-section="${dropZoneId}"]`, pageEnvironment.dragged.outerHTML);
        pageEnvironment.draggedFrom.removeChild(pageEnvironment.dragged);
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