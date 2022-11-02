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
        ORDER BY boards.id
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
        ORDER BY cards.card_order
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
        ORDER BY items.item_order;
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
        , {"card_order": card_order, "board_id": board_id}, fetchall=False)

    return matching_card


def create_new_item(card_id, item_title, item_order):
    data_manager.execute_insert(
        """
        INSERT INTO items(card_id, title, item_order)
        VALUES (%(card_id)s, %(item_title)s, %(item_order)s)
        """
        , {"card_id": card_id, "item_title": item_title, "item_order": item_order}
    )
    matching_card = data_manager.execute_select(
        """
        SELECT * FROM items
        WHERE items.item_order = %(item_order)s AND items.card_id = %(card_id)s
        ;
        """
        , {"item_order": item_order, "card_id": card_id})

    return matching_card


def create_empty_board(board_title):
    matching_board = data_manager.execute_select(
        """
        INSERT INTO boards(title)
        VALUES (%(board_title)s);
        SELECT * from boards
        WHERE boards.id = currval(pg_get_serial_sequence('boards', 'id'));
        """
        , {"board_title": board_title}, fetchall=False)

    return matching_board


def update_board_title(board_id, board_title):
    data_manager.execute_insert(
        """
        UPDATE boards
        SET title = %(board_title)s
        WHERE boards.id = %(board_id)s;
        SELECT * from boards
        WHERE boards.id = %(board_id)s;
        """
        , {"board_id": board_id, "board_title": board_title})


def update_card_name(card_id, card_name):
    data_manager.execute_insert(
        """
        UPDATE cards
        SET title = %(card_name)s
        WHERE cards.id = %(card_id)s;
        SELECT * from cards
        WHERE cards.id = %(card_id)s;
        """
        , {"card_id": card_id, "card_name": card_name})


def update_item_name(item_id, item_name):
    data_manager.execute_insert(
        """
        UPDATE items
        SET title = %(item_name)s
        WHERE items.id = %(item_id)s;
        """
        , {"item_id": item_id, "item_name": item_name})


def delete_board(board_id):
    data_manager.execute_insert(
        """
        DELETE FROM items
        WHERE card_id IN (SELECT id FROM cards
                          WHERE board_id = %(board_id)s);
                          
        DELETE FROM cards
        WHERE board_id = %(board_id)s;
        
        DELETE FROM boards
        WHERE id = %(board_id)s;
        """
        , {"board_id": board_id})


def delete_item(item_id):
    data_manager.execute_insert(
        """
        DELETE FROM items
        WHERE id = %(item_id)s;
        """
        , {"item_id": item_id})


def delete_card(card_id):
    data_manager.execute_insert(
        """
        DELETE FROM items
        WHERE card_id = %(card_id)s;

        DELETE FROM cards
        WHERE id = %(card_id)s;
        """
        , {"card_id": card_id})


def register_user(email, hashed_password, name):
    data_manager.execute_insert(
        """
        INSERT INTO users(email, password, name)
        VALUES (%(email)s, %(hashed_password)s, %(name)s);
        """
        , {"email": email, "hashed_password": hashed_password, "name": name})


def check_user_existence(email):
    matching_user = data_manager.execute_select(
        """
        SELECT * from users
        WHERE email = %(email)s;
        """
        , {"email": email}, fetchall=False)
    return matching_user
