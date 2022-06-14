-- Revert circles:messageTable from pg

BEGIN;

DROP TABLE "message"CASCADE; 

COMMIT;
