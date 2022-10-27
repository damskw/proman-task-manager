import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    # # remove this code once you implement the database
    # return [{"title": "board1", "id": 1}, {"title": "board2", "id": 2}]

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    # # remove this code once you implement the database
    # return [{"title": "title1", "id": 1}, {"title": "board2", "id": 2}]

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def get_items_for_card(card_id):
    # # remove this code once you implement the database
    # return [{"title": "title1", "id": 1}, {"title": "board2", "id": 2}]

    matching_items = data_manager.execute_select(
        """
        SELECT * FROM items
        WHERE items.card_id = %(card_id)s
        ;
        """
        , {"card_id": card_id})

    return matching_items


def create_empty_card(board_id, card_title, card_order):
    data_manager.execute_insert(
        """
        INSERT INTO cards(board_id, title, card_order)
        VALUES (%(board_id)s, %(card_title)s, %(card_order)s)
        """
        , {"board_id": board_id, "card_title": card_title, "card_order": card_order}
    )
    matching_card = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.card_order = %(card_order)s AND cards.board_id = %(board_id)s
        ;
        """
        , {"card_order": card_order, "board_id": board_id})

    return matching_card
