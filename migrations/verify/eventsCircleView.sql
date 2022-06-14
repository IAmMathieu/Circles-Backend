-- Verify circles:eventsCircleView on pg

BEGIN;

SELECT "circle_id", "futur_events"
FROM "events_by_circle"
WHERE FALSE;

ROLLBACK;
