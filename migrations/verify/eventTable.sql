-- Verify circles:eventTable on pg

BEGIN;

SELECT "id", "title", "start", "end", "description", "allday", "user_id", "circle_id", "color", "created_at"
FROM "event"
WHERE FALSE;


ROLLBACK;
