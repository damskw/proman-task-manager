import os
import random

from flask import Flask, render_template, url_for, request, redirect, session
from dotenv import load_dotenv
from util import json_response
import bcrypt as bcrypt
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = os.environ.get('APP_KEY')
load_dotenv()


# @app.route("/")
# def index():
#     """
#     This is a one-pager which shows all the boards and cards
#     """
#     return render_template('index.html')


@app.route("/boards")
@app.route("/")
def boards():
    """
    For testing purposes only
    """
    return render_template("boards_layout.html")


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queries.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    if request.method == "GET":
        return queries.get_cards_for_board(board_id)


@app.route("/api/boards/", methods=["POST"])
@json_response
def create_new_board():
    """
    Creates an empty board
    """
    if request.method == "POST":
        data = request.get_json()
        board_title = data["boardTitle"]
        user_id = data["userId"]
        type = data["type"]
        return queries.create_empty_board(board_title, user_id, type)


@app.route("/api/boards/<int:board_id>/delete/", methods=["POST"])
@json_response
def delete_board(board_id: int):
    """
    Deletes board along with items and cards assigned to it
    :param board_id: id of the board
    """
    if request.method == "POST":
        return queries.delete_board(board_id)


@app.route("/api/items/<int:item_id>/delete/", methods=["POST"])
@json_response
def delete_item(item_id: int):
    """
    Deletes item from a card
    :param item_id: id of an item
    """
    if request.method == "POST":
        return queries.delete_item(item_id)


@app.route("/api/cards/<int:card_id>/delete/", methods=["POST"])
@json_response
def delete_card(card_id: int):
    """
    Deletes card along with its items
    :param card_id: id of a card
    """
    if request.method == "POST":
        return queries.delete_card(card_id)


@app.route("/api/boards/<int:board_id>/title/", methods=["POST"])
def update_board_title(board_id: int):
    """
    Changes a title of a board
    """
    if request.method == "POST":
        data = request.get_json()
        board_title = data["boardTitle"]
        queries.update_board_title(board_id, board_title)
        return redirect('/boards')


@app.route("/api/cards/<int:card_id>/title/", methods=["POST"])
def update_card_name(card_id: int):
    """
    Changes name of a card
    """
    if request.method == "POST":
        data = request.get_json()
        card_name = data["cardName"]
        queries.update_card_name(card_id, card_name)
        return redirect('/boards')


@app.route("/api/items/<int:item_id>/title/", methods=["POST"])
def update_item_name(item_id: int):
    """
    Changes name of an item
    """
    if request.method == "POST":
        data = request.get_json()
        item_name = data["itemName"]
        queries.update_item_name(item_id, item_name)
        return redirect('/boards')


@app.route("/api/boards/<int:board_id>/cards/", methods=["POST"])
@json_response
def add_empty_card(board_id: int):
    """
    Add empty card to a board
    :param board_id: id of a board, title of a new card, order of a new card
    """
    if request.method == "POST":
        data = request.get_json()
        card_title = data["cardTitle"]
        card_order = data["cardOrder"]
        return queries.create_empty_card(board_id, card_title, card_order)


@app.route("/api/cards/<int:card_id>/items/", methods=["POST"])
@json_response
def add_empty_item(card_id: int):
    """
    Add new item to a card
    :param card_id: id of a card, title of a new item, order of a new item
    """
    if request.method == "POST":
        data = request.get_json()
        item_title = data["itemTitle"]
        item_order = data["itemOrder"]
        return queries.create_new_item(card_id, item_title, item_order)


@app.route("/api/cards/<int:card_id>/items/")
@json_response
def get_items_for_card(card_id: int):
    """
    All cards that belongs to a board
    :param card_id: id of the parent board
    """
    return queries.get_items_for_card(card_id)


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


def create_random_user_id():
    random_id = random.randint(1, 1000000000)
    return random_id


@app.route("/api/register/", methods=["POST"])
def register():
    data = request.get_json()
    user = queries.check_user_existence(data["email"])
    if user:
        return user
    name = "User" + str(create_random_user_id())
    queries.register_user(data["email"], hash_password(data["password"]), name)
    return {"email": None}


@app.route("/api/login/", methods=["POST"])
def login():
    data = request.get_json()
    user = queries.check_user_existence(data["email"])
    if not user:
        return {"email": None}
    if not verify_password(data["password"], user["password"]):
        return {"email": data["email"], "password": None}
    session["email"] = user["email"]
    session["name"] = user["name"]
    return user


@app.route("/api/logout/", methods=["post"])
def logout():
    session.pop("email", None)
    session.pop("name", None)
    return render_template("index.html")


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
