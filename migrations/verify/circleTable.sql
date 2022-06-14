-- Verify circles:circleTable on pg

BEGIN;

SELECT "id", "name", "description", "color", "img_url", "user_id", "unique_code", "created_at"
FROM "circle"
WHERE FALSE;

ROLLBACK;
