-- Verify circles:usersOfCircleView on pg

BEGIN;

SELECT "circle_id", "users"
FROM "users_of_circle"
WHERE FALSE;

ROLLBACK;
