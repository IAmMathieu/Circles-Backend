-- Deploy circles:create_tables to pg

BEGIN;

CREATE TABLE "user"
(
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "surname" text,
    "email" text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "birthdate" date NOT NULL,
    "img_url" text,
    "created_at" timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE "circle"
(
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "color" text NOT NULL,
    "img_url" text,
    "user_id" integer NOT NULL REFERENCES "user"(id),
    "unique_code" text NOT NULL UNIQUE,
    "created_at" timestamptz NOT NULL DEFAULT now()

);


CREATE TABLE "message"
(
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" text NOT NULL,
    "user_id" integer NOT NULL REFERENCES "user"(id),
    "created_at" timestamptz NOT NULL DEFAULT now()

);

CREATE TABLE "event"
(
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL,
    "start" timestamptz NOT NULL,
    "end" timestamptz NOT NULL,
    "description" text,
    "allday" boolean,
    "user_id" integer NOT NULL REFERENCES "user"(id),
    "color" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now()

);

CREATE TABLE "calendar"
(
    "circle_id" integer NOT NULL REFERENCES "circle"(id),
    "event_id" integer NOT NULL REFERENCES "event"(id)

);


CREATE TABLE "chat"
(
    "circle_id" integer NOT NULL REFERENCES "circle"(id),
    "message_id" integer NOT NULL REFERENCES "message"(id)

);

CREATE TABLE "user_belongsTo_circle"
(
    "circle_id" integer NOT NULL REFERENCES "circle"(id),
    "user_id" integer NOT NULL REFERENCES "user"(id)

);


COMMIT;
