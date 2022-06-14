-- Verify circles:messageTable on pg

BEGIN;

SELECT "id", "content", "user_id", "created_at"
FROM "message"
WHERE FALSE;

ROLLBACK;
