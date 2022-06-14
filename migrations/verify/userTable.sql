-- Verify circles:userTable on pg

BEGIN;

SELECT "id", "firstname", "lastname", "surname", "email", "password", "birthdate", "img_url", "created_at"
FROM "user"
WHERE FALSE;

ROLLBACK;
