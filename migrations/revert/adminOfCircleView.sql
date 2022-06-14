-- Revert circles:adminOfCircleView from pg

BEGIN;

DROP VIEW IF EXISTS "admin_of_circle" CASCADE;

COMMIT;
