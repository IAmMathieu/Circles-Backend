-- Deploy circles:circleHasUserTable to pg

BEGIN;

CREATE TABLE "circle_has_user"
(
    "circle_id" integer NOT NULL REFERENCES "circle"(id) ON DELETE CASCADE,
    "user_id" integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE

);

COMMIT;
