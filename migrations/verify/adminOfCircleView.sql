-- Verify circles:adminOfCircleView on pg

BEGIN;

SELECT "circle_id", "admin"
FROM "admin_of_circle"
WHERE FALSE;

ROLLBACK;
