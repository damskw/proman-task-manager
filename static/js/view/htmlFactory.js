export const htmlTemplates = {
    board: 1,
    card: 2,
    item: 3,
    deleteModal: 4,
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.item]: itemBuilder,
    [htmlTemplates.deleteModal]: deleteModalBuilder,
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
                    <div class="board-header-buttons">
                        <div class="board-name" data-board-title-id=${board.id}>${board.title}</div>
                        <i class="fa-solid fa-trash" id="trash-icon-delete-board" data-board-delete-icon-id=${board.id}></i>
                        <form class="hide-display" id="edit-title-form" data-edit-board-name-id=${board.id}>
                            <input type="text" name="board-title" placeholder="${board.title}" class="board-name board-name-edit">
                            <input type="submit" class="page-button" value="Submit">
                        </form>
                    </div>
                    <hr>
                    <button class="page-button" data-new-card-board-id=${board.id}>Add new card</button>
                    <i class="fa-sharp fa-solid fa-arrow-up board-name-arrow" data-arrow-board-id=${board.id}></i>
                </div>
                <div class="cards-container" data-board-cards-container-id=${board.id}>
                
                </div>
            </div>`;
}

function cardBuilder(card) {
    return `<div class="single-card" data-card-id="${card.id}">
                <div class="card-header-wrapper" data-card-header-id="${card.id}">
                    <div class="card-header">
                        <div class="fill-space"></div>
                        <div class="card-name" data-card-name-id="${card.id}">${card.title}</div>
                        <span id="delete-card-button" data-delete-card-button-id="${card.id}">&times;</span>
                    </div>
                </div>
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
    return `<div class="card-item" data-item-id="${item.id}">
                <div class="card-item-wrapper" data-item-wrapper-id="${item.id}">
                    <div class="item-name-wrapper">
                        <div class="item-name" data-item-name-id="${item.id}">${item.title}</div>
                        <span id="delete-item-button" data-item-delete-button-id="${item.id}">&times;</span>
                    </div>
                </div>
                <div class="edit-item-form-wrapper hide-display" data-edit-form-item-wrapper-id=${item.id}>
                    <form id="edit-item-form" data-form-edit-item-id="${item.id}">
                       <textarea name="item-name" id="edit-item-area">${item.title}</textarea>
                       <input type="submit" id="submit-edit-item" class="page-button" value="Submit">
                    </form>
                </div>
            </div>`;
}


function deleteModalBuilder() {
    return `<div class="modal" id="modal-delete-confirmation">
                <div class="modal-content">
                <span class="close" id="modal-close-button">&times;</span>
                <p>Are you sure you want to delete this board?</p>
                <button class="page-button" id="yes-delete-button">Yes</button>
                <button class="page-button" id="no-delete-button">No</button>
                </div>
            </div>`
}
