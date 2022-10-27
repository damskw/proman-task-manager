export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getBoard: async function (boardId) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: async function () {
        // the statuses are retrieved and then the callback function is called with the statuses
    },
    getStatus: async function (statusId) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getItemsByCardId: async function (cardId) {
        return await apiGet(`/api/cards/${cardId}/items/`);
    },
    getCard: async function (cardId) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: async function (boardTitle) {
        // creates new board, saves it and calls the callback function with its data
    },
    createNewCard: async function (cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
    },
    createEmptyCard: async function (boardId) {
        // creates an empty card which values can be updated later
        const cards = await this.getCardsByBoardId(boardId);
        const data = {cardTitle: "new card", boardId: boardId, cardOrder: cards.length + 1};
        return await apiPost(`/api/boards/${boardId}/cards/`, data)
    },
    createNewItem: async function (cardId) {
        // creates a new item with default text
        const items = await this.getItemsByCardId(cardId);
        const data = {itemTitle: "new item", cardId: cardId, itemOrder: items.length + 1};
        return await apiPost(`/api/cards/${cardId}/items/`, data)
    }
};

async function apiGet(url) {
    let response = await fetch(url, {
        method: "GET",
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiPost(url, payload) {
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        return await response.json();
    }
}

async function apiDelete(url) {
}

async function apiPut(url) {

}

async function apiPatch(url) {
}
