const calendarDataMapper = require("../datamapper/calendarDatamapper");


const userController = {
    async addEvent (req,res){
        const {title,start,end,description,allday,user_id,color} = req.nody;
        const addEvent = await calendarDataMapper.addEvent(title,start,end,description,allday,user_id,color)
        console.log(addEvent);
        res.json(addEvent);
    
    }
}


module.exports = userController;
