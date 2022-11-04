--
-- PostgreSQL database Proman
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

SET default_tablespace = '';

SET default_with_oids = false;

---
--- drop tables
---

DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS cards;
DROP TABLE IF EXISTS boards CASCADE;
DROP TABLE IF EXISTS users;

---
--- create tables
---

CREATE TABLE boards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    title       VARCHAR(200)        NOT NULL,
    type        VARCHAR(200)                , --- PUBLIC OR PRIVATE
    ownerId    INTEGER
);

CREATE TABLE cards (
    id          SERIAL PRIMARY KEY  NOT NULL,
    board_id    INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    card_order  INTEGER             NOT NULL
);

CREATE TABLE items
(
    id          SERIAL PRIMARY KEY  NOT NULL,
    card_id     INTEGER             NOT NULL,
    title       VARCHAR (200)       NOT NULL,
    item_order  INTEGER             NOT NULL
);

CREATE TABLE users
(
    id          SERIAL PRIMARY KEY  NOT NULL,
    email       VARCHAR(254)        NOT NULL,
    password    text                NOT NULL,
    name        VARCHAR(200)
);

---
--- insert data
---

INSERT INTO boards(title) VALUES ('Board 1');
INSERT INTO boards(title) VALUES ('Board 2');

INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 1, 'done card 1', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'new card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'new card 2', 2);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'in progress card', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'planning', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'done card 1', 1);
INSERT INTO cards VALUES (nextval('cards_id_seq'), 2, 'done card 1', 2);

INSERT INTO items(card_id, title, item_order) VALUES (1, 'item item', 1);
INSERT INTO items(card_id, title, item_order) VALUES (1, 'item item', 2);
INSERT INTO items(card_id, title, item_order) VALUES (1, 'item item', 3);

INSERT INTO items(card_id, title, item_order) VALUES (3, 'item item', 1);
INSERT INTO items(card_id, title, item_order) VALUES (4, 'item item', 1);
INSERT INTO items(card_id, title, item_order) VALUES (5, 'item item', 1);

---
--- add constraints
---

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_cards_board_id FOREIGN KEY (board_id) REFERENCES boards(id);

ALTER TABLE ONLY items
    ADD CONSTRAINT fk_items_card_id FOREIGN KEY (card_id) REFERENCES cards(id);
