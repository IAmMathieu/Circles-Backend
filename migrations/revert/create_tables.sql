-- Revert circles:create_tables from pg

BEGIN;

DROP TABLE "user" CASCADE;
DROP TABLE "circle" CASCADE; 
DROP TABLE "message"CASCADE;  
DROP TABLE "event" CASCADE;
DROP TABLE "calendar" CASCADE;
DROP TABLE "chat" CASCADE;
DROP TABLE "user_belongsTo_circle" CASCADE;

COMMIT;
