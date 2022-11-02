export const htmlTemplates = {
    board: 1,
    card: 2,
    item: 3,
    deleteModal: 4,
    spinner: 5,
    loginregister: 6,
    login: 7,
    register: 8,
}

export const builderFunctions = {
    [htmlTemplates.board]: boardBuilder,
    [htmlTemplates.card]: cardBuilder,
    [htmlTemplates.item]: itemBuilder,
    [htmlTemplates.deleteModal]: deleteModalBuilder,
    [htmlTemplates.spinner]: spinnerBuilder,
    [htmlTemplates.loginregister]: loginRegisterModalBuilder,
    [htmlTemplates.login]: loginModalBuilder,
    [htmlTemplates.register]: registerModalBuilder,
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
                            <form class="hide-display edit-title-form" data-edit-board-name-id=${board.id}>
                                <input type="text" name="board-title" placeholder="${board.title}" class="board-name board-name-edit">
                                <input type="submit" class="page-button" value="Submit">
                            </form>
                        <i class="fa-solid fa-trash" id="trash-icon-delete-board" data-board-delete-icon-id=${board.id}></i>
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
                        <form class="card-edit-form" data-form-edit-card-id="${card.id}">
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
                    <form class="edit-item-form" data-form-edit-item-id="${item.id}">
                       <textarea name="item-name" class="edit-item-area">${item.title}</textarea>
                       <input type="submit" class="page-button submit-edit-item" value="Submit">
                    </form>
                </div>
            </div>`;
}


function deleteModalBuilder() {
    return `<div class="modal" id="modal-delete-confirmation">
                <div class="modal-content" id="modal-delete-content">
                <span class="close" id="modal-close-button">&times;</span>
                <p>Are you sure you want to delete this board?</p>
                <button class="page-button" id="yes-delete-button">Yes</button>
                <button class="page-button" id="no-delete-button">No</button>
                </div>
            </div>`
}

function spinnerBuilder() {
    return `
                 <div class="spinner-position">
                     <div class="spinner">
                        <div class="dot1"></div>
                        <div class="dot2"></div>
                        <div class="dot3"></div>
                     </div>
                 </div>
              `
}


function loginRegisterModalBuilder() {
    return `
        <div class="modal" id="modal-login-register">
            <div class="modal-content" id="modal-content-login-register">
                <span class="close" id="modal-close-button">&times;</span>

            </div>
         </div>`
}

function loginModalBuilder() {
    return `    <form id="login-modal-form">
                    <div class="inputs-wrapper">
                        <div class="input-group">
                            <input required="" type="email" name="e-mail" autocomplete="off" class="input">
                            <label class="user-label">User E-mail</label>
                        </div>
                        <div class="input-group">
                            <input required="" type="password" name="password" autocomplete="off" class="input">
                            <label class="user-label">Password</label>
                        </div>
                        <input type="submit" class="page-button" value="Login">
                        <p id="redirect-register">Don't have an account? Register here.</p>
                        <p id="lost-password">Lost password? Click here.</p>
                    </div>
                </form>`
}

function registerModalBuilder() {
    return `    <form id="register-modal-form">
                    <div class="inputs-wrapper">
                        <div class="input-group">
                            <input required="" type="email" name="email" autocomplete="off" class="input">
                            <label class="user-label">User E-mail</label>
                        </div>
                        <div class="input-group">
                            <input required="" type="password" name="password" autocomplete="off" class="input">
                            <label class="user-label">Password</label>
                        </div>
                        <div class="input-group">
                            <input required="" type="password" name="repeat-password" autocomplete="off" class="input">
                            <label class="user-label">Repeat password</label>
                        </div>
                        <input type="submit" class="page-button" value="Register">
                        <p id="register-notification"></p>
                        <p id="redirect-login">Already have an account? Login here.</p>
                    </div>
                </form>`
}
