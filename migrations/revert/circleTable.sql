-- Revert circles:circleTable from pg

BEGIN;

DROP TABLE "circle" CASCADE; 

COMMIT;
