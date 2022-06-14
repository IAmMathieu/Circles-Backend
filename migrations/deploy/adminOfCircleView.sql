-- Deploy circles:adminOfCircleView to pg

BEGIN;

CREATE VIEW "admin_of_circle" AS        
    SELECT 
        circle.id AS circle_id,
        jsonb_agg(json_build_object('id',"user".id, 'firstname', "user".firstname, 'lastname', "user".lastname, 'surname', "user".surname, 'email',  "user".email, 'birthdate', "user".birthdate, 'img_url', "user".img_url)) AS admin
    FROM "circle" 
    JOIN "user" ON user_id = "user".id
    GROUP BY "circle".id;

COMMIT;
