-- Revert circles:eventTable from pg

BEGIN;

DROP TABLE "event" CASCADE;

COMMIT;
