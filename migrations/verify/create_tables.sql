-- Verify circles:create_tables on pg

BEGIN;

SELECT "id", "firstname", "lastname", "surname", "email", "password", "birthdate", "img_url", "created_at"
FROM "user"
WHERE FALSE;

SELECT "id", "name", "description", "color", "img_url", "user_id", "unique_code", "created_at"
FROM "circle"
WHERE FALSE;

SELECT "id", "content", "user_id", "created_at"
FROM "message"
WHERE FALSE;

SELECT "id", "title", "start", "end", "description", "allday", "user_id", "color", "created_at"
FROM "event"
WHERE FALSE;

SELECT "circle_id", "event_id"
FROM "calendar"
WHERE FALSE;

SELECT "circle_id", "message_id"
FROM "chat"
WHERE FALSE;

SELECT "circle_id", "user_id"
FROM "user_belongsTo_circle"
WHERE FALSE;

ROLLBACK;

