const client = require("../config/database");

const calendarDataMapper = {
    async addEvent (title,start,end,description,allday,user_id,color){
        const query = {
            text : `INSERT INTO "event" ("title, "start","end","description","allday","user_id","color")
                    VALUES ($1,$2,$3,$4,$5,$6,$7)`,
            values : [title,start,end,description,allday,user_id,color],
        }
        return await client.query(query);
    }

};

module.exports = calendarDataMapper;
