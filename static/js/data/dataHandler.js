export let dataHandler = {
    getBoards: async function () {
        return await apiGet("/api/boards");
    },
    getUserBoards: async function (userId) {
        return await apiGet(`/api/user/${userId}/boards`);
    },
    getCardsByBoardId: async function (boardId) {
        return await apiGet(`/api/boards/${boardId}/cards/`);
    },
    getItemsByCardId: async function (cardId) {
        return await apiGet(`/api/cards/${cardId}/items/`);
    },
    createNewBoard: async function (boardTitle, userId, type) {
        // creates new board, saves it and calls the callback function with its data
        const data = {boardTitle: boardTitle, userId: userId, type: type};
        return await apiPost(`/api/boards/`, data);
    },
    createEmptyCard: async function (boardId, cardTitle) {
        // creates an empty card which values can be updated later
        const cards = await this.getCardsByBoardId(boardId);
        const data = {cardTitle: cardTitle, boardId: boardId, cardOrder: cards.length + 1};
        return await apiPost(`/api/boards/${boardId}/cards/`, data)
    },
    createNewItem: async function (cardId) {
        // creates a new item with default text
        const items = await this.getItemsByCardId(cardId);
        const data = {itemTitle: "new item", cardId: cardId, itemOrder: items.length + 1};
        return await apiPost(`/api/cards/${cardId}/items/`, data)
    },
    moveItem: async function (newCardId, itemId) {
        // moves item to a new card
        const items = await this.getItemsByCardId(newCardId);
        const data = {newCardId: newCardId, itemOrder: items.length + 1};
        await apiPut(`/api/items/${itemId}/move/`, data);
    },
    changeBoardTitle: async function (boardId, boardTitle) {
        // changes title of a board
        const data = {boardTitle: boardTitle, boardId: boardId};
        await apiPut(`/api/boards/${boardId}/title/`, data)
    },
    changeCardName: async function (cardId, cardName) {
        // changes name of a card
        const data = {cardName: cardName, cardId: cardId};
        await apiPut(`/api/cards/${cardId}/title/`, data)
    },
    changeItemName: async function (itemId, itemName) {
        // changes name of an item
        const data = {itemName: itemName, itemId: itemId};
        await apiPut(`/api/items/${itemId}/title/`, data)
    },
    deleteBoard: async function (boardId) {
        // deletes board with items and cards
        await apiDelete(`/api/boards/${boardId}/delete/`)
    },
    deleteItem: async function (itemId) {
        // deletes item from a card
        await apiDelete(`/api/items/${itemId}/delete/`)
    },
    deleteCard: async function (cardId) {
        // deletes card with items
        await apiDelete(`/api/cards/${cardId}/delete/`)
    },
    registerUser: async function (email, password) {
        // registers user
        const data = {email: email, password: password};
        return await apiPost(`/api/register/`, data)
    },
    loginUser: async function (email, password) {
        // logins user
        const data = {email: email, password: password};
        return await apiPost(`/api/login/`, data)
    },
    logoutUser: async function () {
        // logouts user
        return await apiPatch(`/api/logout/`)
    },
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
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}

async function apiPut(url, payload) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
}

async function apiPatch(url) {
    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
