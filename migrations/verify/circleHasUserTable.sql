-- Verify circles:circleHasUserTable on pg

BEGIN;

SELECT "circle_id", "user_id"
FROM "circle_has_user"
WHERE FALSE;

ROLLBACK;
