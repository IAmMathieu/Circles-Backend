-- Revert circles:eventsCircleView from pg

BEGIN;

DROP VIEW IF EXISTS "events_by_circle" CASCADE;

COMMIT;
