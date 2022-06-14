-- Revert circles:circleHasUserTable from pg

BEGIN;

DROP TABLE "circle_has_user" CASCADE;

COMMIT;
