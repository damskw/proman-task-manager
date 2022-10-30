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
                    <div class="board-name" data-board-title-id=${board.id}>${board.title}</div>
                    <form class="hide-display" id="edit-title-form" data-edit-board-name-id=${board.id}>
                        <input type="text" name="board-title" placeholder="${board.title}" class="board-name board-name-edit">
                        <input type="submit" class="page-button" value="Submit">
                    </form>
                    <hr>
                    <button class="page-button" data-new-card-board-id=${board.id}>Add new card</button>
                </div>
                <div class="cards-container" data-board-cards-container-id=${board.id}>
                
                </div>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="single-card" data-card-id="${card.id}">
                <div class="card-name" data-card-name-id="${card.id}">${card.title}</div>
                    <div class="edit-card-name-wrapper hide-display" data-edit-card-name-id=${card.id}>
                        <form id="card-edit-form" data-form-edit-card-id="${card.id}">
                            <input type="text" name="card-title" placeholder="${card.title}" class="card-name card-name-edit">
                            <input type="submit" class="page-button" value="Submit">
                        </form>
                    </div>

                
                <div class="single-card-item-section" data-card-id-item-section="${card.id}">
                
                </div>
                <div class="card-button-section">
                    <button class="transparent-button" data-add-item-button-card-id="${card.id}">Add item</button>
                </div>
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

