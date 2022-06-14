-- Verify circles:messageDetailView on pg

BEGIN;

SELECT "circle_id", "messages"
FROM "message_detail"
WHERE FALSE;

ROLLBACK;
