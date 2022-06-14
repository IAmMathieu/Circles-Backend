-- Deploy circles:messageDetailView to pg

BEGIN;

CREATE VIEW "message_detail" AS
    SELECT 
        "circle".id AS circle_id,
        jsonb_agg(json_build_object('text', "message".content, 'user_id', "user".id, 'surname', "user".surname, 'time', "message".created_at)) AS messages
    FROM "message"
    JOIN "user" ON user_id = "user".id
    JOIN "circle" ON circle_id = "circle".id
    GROUP BY "circle".id;

COMMIT;
