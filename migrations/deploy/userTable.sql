-- Deploy circles:userTable to pg

BEGIN;

CREATE TABLE "user"
(
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" text NOT NULL,
    "lastname" text NOT NULL,
    "surname" text,
    "email" text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "birthdate" timestamp NOT NULL,
    "img_url" text,
    "validation_code" text,
    "firstconnect" boolean NOT NULL DEFAULT FALSE,
    "created_at" timestamptz NOT NULL DEFAULT now()
);

COMMIT;
