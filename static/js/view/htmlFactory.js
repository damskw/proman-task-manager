export const htmlTemplates = {
    board: 1,
    card: 2,
    item: 3
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.item]: itemBuilder
};

export function htmlFactory(template) {
    if (builderFunctions.hasOwnProperty(template)) {
        return builderFunctions[template];
    }

    console.error("Undefined template: " + template);

    return () => {
        return "";
    };
}

function boardBuilder(board) {
    return `<div class="single-board" data-board-id=${board.id}>
                <div class="board-header">
                    <div class="board-name">${board.title}</div>
                    <hr>
                    <button class="page-button" data-new-card-board-id=${board.id}>Add new card</button>
                </div>
                <div class="cards-container" data-board-cards-container-id=${board.id}>
                
                </div>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="single-card" data-card-id="${card.id}">
                <div class="card-name">${card.title}</div>
                
            </div>`;
}

function itemBuilder(item) {
    return `<div class="card-item" data-item-id="${item.id}">${item.title}</div>`;
}


// function boardBuilder(board) {
//     return `<div class="board-container">
//                 <div class="board" data-board-id=${board.id}>${board.title}</div>
//                 <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
//             </div>`;
// }

// function cardBuilder(card) {
//     return `<div class="card" data-card-id="${card.id}">${card.title}</div>`;
// }

