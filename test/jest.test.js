const userController = require('../app/controllers/userController');

describe('userController', ()=>{
    it("should be an object", async () =>{
        expect(await userController.getUser()).tobeInstanceOf(Object);
    })
})