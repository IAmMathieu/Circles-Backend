const calendarDataMapper = require("../datamapper/calendarDatamapper");


const calendarController = {
    
    async addEvent (req,res){
        const userId = req.params.id;
        const addEvent = await calendarDataMapper.addEvent(req.body,userId);
        res.json(addEvent);
    },
    
    async patchEvent(req,res){
        const userId = req.params.id;
        const eventId = req.params.event_id;

        const patchEvent = await calendarDataMapper.patchEvent(req.body, userId, eventId);
        res.json(patchEvent);
    
    },

    async allEvent(req,res){
        const allEvent = await calendarDataMapper.allEvent();
        res.json(allEvent);
    }
}


module.exports = calendarController;
