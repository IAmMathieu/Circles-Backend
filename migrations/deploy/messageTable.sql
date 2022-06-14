-- Deploy circles:messageTable to pg

BEGIN;

CREATE TABLE "message"
(
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "content" text NOT NULL,
    "user_id" integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "circle_id" integer NOT NULL REFERENCES "circle"(id) ON DELETE CASCADE,
    "created_at" timestamptz NOT NULL DEFAULT now()

);

COMMIT;
