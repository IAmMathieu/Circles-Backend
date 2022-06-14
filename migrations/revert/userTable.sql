-- Revert circles:userTable from pg

BEGIN;

DROP TABLE "user" CASCADE;

COMMIT;
