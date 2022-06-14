-- Deploy circles:eventsCircleView to pg

BEGIN;

CREATE VIEW "events_by_circle" AS
    SELECT 
        circle_id,
        COUNT("event".id) as futur_events
    FROM "event"
    WHERE "event".start >= CURRENT_TIMESTAMP
    GROUP BY circle_id;

COMMIT;
