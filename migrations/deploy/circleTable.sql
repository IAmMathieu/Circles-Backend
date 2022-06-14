-- Deploy circles:circleTable to pg

BEGIN;

CREATE TABLE "circle"
(
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    "description" text NOT NULL,
    "color" text NOT NULL,
    "img_url" text,
    "user_id" integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "unique_code" text NOT NULL UNIQUE,
    "created_at" timestamptz NOT NULL DEFAULT now()

);

COMMIT;
