-- Revert circles:messageDetailView from pg

BEGIN;

DROP VIEW IF EXISTS "message_detail" CASCADE;

COMMIT;
