-- Deploy circles:eventTable to pg

BEGIN;

CREATE TABLE "event"
(
    "id" integer NOT NULL GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" text NOT NULL,
    "start" timestamp NOT NULL,
    "end" timestamp,
    "description" text,
    "allday" boolean,
    "user_id" integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    "circle_id" integer NOT NULL REFERENCES "circle"(id) ON DELETE CASCADE,
    "color" text NOT NULL,
    "created_at" timestamptz NOT NULL DEFAULT now()

);

COMMIT;
