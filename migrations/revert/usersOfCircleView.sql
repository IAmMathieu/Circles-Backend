-- Revert circles:usersOfCircleView from pg

BEGIN;

DROP VIEW IF EXISTS "users_of_circle" CASCADE;

COMMIT;
