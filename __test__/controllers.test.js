const userDataMapper = require("../app/datamapper/userDatamapper");

// describe("Function getUser",  () =>{
//     it("should be an object", ()=>{
//     try{
//            expect(userDataMapper.getUser()).toBeInstanceOf(Object);
//     }catch(e){
//         console.log(e)
//     }
//     })
// });

describe("Function getUserInfo", () => {
  it("should be an object", async () => {
    await expect(userDataMapper.getUserInfo()).toBeInstanceOf(Object);
  });
});

// describe("Function createUser", () => {
//   it("returns an object", async () => {
//     await expect(userDataMapper.createUser()).toBeInstanceOf(Object);
//   });
// });

// describe("Function patchUser", () => {
//   it("returns an object", async () => {
//     await expect(userDataMapper.patchUser()).toBeInstanceOf(Object);
//   });
// });

// describe("Function getAllInfosFromUserId", () => {
//   it("should be an object", async () => {
//     await expect(userDataMapper.getAllInfosFromUserId()).toBeInstanceOf(Object);
//   });
// });
