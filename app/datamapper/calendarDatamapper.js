const client = require("../config/database");

const calendarDataMapper = {
    
    async addEvent (data, id){
        const query = {
            text : `INSERT INTO "event" ("title","start","end","description","allday","user_id","color")
                    VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            values : [data.title,data.start,data.end,data.description,data.allday,id,data.color],
        }
        return await client.query(query);
    },

    async patchEvent(data, userId, eventId){
        const query = {
            text : `UPDATE "event" 
                    SET "title" = $1,
                    "start" = $2,
                    "end" = $3,
                    "description" = $4,
                    "allday" = $5,
                    "user_id" = $6,
                    "color" = $7
                    WHERE "event".id = $8`,
            values : [data.title,data.start,data.end,data.description,data.allday,userId,data.color, eventId],
        }
        return await client.queryno(query);
    },

    async allEvent (){
        const query = {
            text : `SELECT * 
                FROM "event"`
        }
        const allEvent = await client.query(query);
        return allEvent.rows;
    }

};

module.exports = calendarDataMapper;
