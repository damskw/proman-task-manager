from flask import Flask, render_template, url_for, request, redirect
from dotenv import load_dotenv
from util import json_response
import mimetypes
import queries

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


@app.route("/boards")
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
        return queries.create_empty_board(board_title)


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


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
