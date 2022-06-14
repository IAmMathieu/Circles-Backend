-- Deploy circles:usersOfCircleView to pg

BEGIN;

CREATE VIEW "users_of_circle" AS        
    SELECT 
        "circle".id AS circle_id,
        COUNT("user".*) as users_count, 
        jsonb_agg(json_build_object('id',"user".id, 'firstname', "user".firstname, 'lastname', "user".lastname, 'surname', "user".surname, 'email',  "user".email, 'birthdate', "user".birthdate, 'img_url', "user".img_url)) AS users
    FROM "circle_has_user"
    JOIN "user" ON user_id = "user".id
    JOIN "circle" ON circle_id = "circle".id
    GROUP BY "circle".id;

COMMIT;
