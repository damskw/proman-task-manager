import {domManager} from "../view/domManager.js";
import {dataHandler} from "../data/dataHandler.js";
import {itemsManager} from "./itemsManager.js";

export let dragDropManager = {
    initDraggable: function (object) {
        const item = "item_order" in object ? document.querySelector(`.card-item[data-item-id="${object["id"]}"]`) : document.querySelector(`.single-card[data-card-id="${object["id"]}"]`);
        item.setAttribute("draggable", true);
        item.addEventListener("dragstart", handleDragStart);
        item.addEventListener("dragend", handleDragEnd);
    },
    initDropZone: function (object) {
        const element = "card_order" in object ? document.querySelector(`.single-card[data-card-id="${object["id"]}"]`) : document.querySelector(`.single-card[data-card-id="${object["id"]}"]`)
        element.addEventListener("dragenter", handleDragEnter);
        element.addEventListener("dragover", handleDragOver);
        element.addEventListener("dragleave", handleDragLeave);
        element.addEventListener("drop", handleDrop);
    },
}

export const pageEnvironment = {
    dragged: null,
    draggedFrom: null,
    draggedId: null,
    draggedFromId: null,
}

function handleDragStart(e) {
    pageEnvironment.dragged = e.currentTarget;
    pageEnvironment.draggedId = e.currentTarget.dataset.itemId
    pageEnvironment.draggedFrom = e.currentTarget.parentNode;
    pageEnvironment.draggedFromId = e.currentTarget.parentNode.dataset.cardIdItemSection;
    changeDragStartStyles(e.currentTarget);

}

function clearPageEnvironment() {
    pageEnvironment.dragged = null;
    pageEnvironment.draggedFrom = null;
    pageEnvironment.draggedId = null;
    pageEnvironment.draggedFromId = null;
}

function changeDragStartStyles(element) {
    element.classList.add("item-drag-start");
}

function changeDragEndStyles(element) {
    element.classList.remove("item-drag-start");
}

function changeDragOverStyles(element) {
    element.classList.add("card-drag-over");
}

function changeDragLeaveStyles(element) {
    element.classList.remove("card-drag-over");
}


function handleDragEnd(e) {
    changeDragEndStyles(pageEnvironment.dragged);
    clearPageEnvironment();
}

function handleDragEnter(e) {

}

function handleDragOver(e) {
    e.preventDefault();
    changeDragOverStyles(e.currentTarget);
}

function handleDragLeave(e) {
    changeDragLeaveStyles(e.currentTarget);
}

function resetAttributes(itemId) {
    const item = document.querySelector(`.card-item[data-item-id="${itemId}"]`)
    item.setAttribute("draggable", true);
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
}

async function handleDrop(e) {
    e.preventDefault();
    const dropZoneId = e.currentTarget.dataset.cardId;
    if (dropZoneId === pageEnvironment.draggedFromId) {
        changeDragLeaveStyles(e.currentTarget);
        return;
    }
    changeDragEndStyles(pageEnvironment.dragged);
    domManager.addChild(`.single-card-item-section[data-card-id-item-section="${dropZoneId}"]`, pageEnvironment.dragged.outerHTML);
    pageEnvironment.draggedFrom.removeChild(pageEnvironment.dragged);
    itemsManager.addItemsDefaultEventListeners(pageEnvironment.draggedId);
    resetAttributes(pageEnvironment.draggedId);
    changeDragLeaveStyles(e.currentTarget);
    await dataHandler.moveItem(dropZoneId, pageEnvironment.draggedId);
}