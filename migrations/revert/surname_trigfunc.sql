-- Revert circles:surname_trigfunc from pg

BEGIN;

DROP TRIGGER trig_firstname_to_surname ON "user" CASCADE;

DROP FUNCTION firstname_to_surname() CASCADE;


COMMIT;
