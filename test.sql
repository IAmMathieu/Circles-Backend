-- récupere tout les events d'un calendrier pour les cercles d'un user

SELECT circle.id as circle_id, title, "start", "end", "event".description, allday, "event".user_id as author, "event".color, "event".created_at
  FROM calendar
  JOIN "circle" ON circle_id = circle.id
  JOIN "event" ON event_id = "event".id
  WHERE circle.id = ANY (
    SELECT circle_id
    FROM "user_belongsTo_circle"
    JOIN "user" ON user_id = "user".id
    JOIN "circle" ON circle_id = circle.id
    WHERE "user".id = 2)
ORDER BY circle_id


-- récupere tout les messages et auteurs des chats des cercles d'un user
 
SELECT circle.id as circle_id, "message".content, "user".surname, "message".created_at
  FROM "chat"
  JOIN "circle" ON circle_id = circle.id
  JOIN "message" ON message_id = "message".id
  JOIN "user" ON "user".id = "message".user_id
  WHERE circle.id = ANY (
    SELECT circle_id
    FROM "user_belongsTo_circle"
    JOIN "user" ON user_id = "user".id
    JOIN "circle" ON circle_id = circle.id
    WHERE "user".id = 2)
ORDER BY circle_id


-- récupere tout les ids de cercles auxquels appartient un user
SELECT circle_id
FROM "user_belongsTo_circle"
JOIN "user" ON user_id = "user".id
JOIN "circle" ON circle_id = circle.id
WHERE "user".id = 2