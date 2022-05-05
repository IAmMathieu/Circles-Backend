const userDataMapper = require("../datamapper/userDatamapper");
const jwbtoken = require("../middlewares/jwtMiddleware");

const userController = {
  async getUser(req, res) {
    const { email, password } = req.body;
    const user = await userDataMapper.getUser(email, password);

    if (user) {
      res.json({
        logged: true,
        surname: user.surname,
        token: jwbtoken.generateAccessToken(user.id),
      });
    } else {
      res.status(401).send("Unauthorized User");
    }
  },

  async getUserInfo(req, res) {
    const userId = req.params.id;
    const user = await userDataMapper.getUserInfo(userId);
    res.json(user);
  },

  async createUser (req,res){
    const {firstname,lastname, email, password, birthdate,img_url} = req.body;
    const createUser = await userDataMapper.createUser(firstname,lastname, email, password, birthdate,img_url);
    if(createUser){
      res.send("User is created");
    }
  },

  async patchUser (req,res){
    const userId = req.params.id;
    const {firstname,lastname, email, password, birthdate,img_url} = req.body;
    const patchUser = await userDataMapper.patchUser(userId, firstname,lastname, email, password, birthdate,img_url);

    if(patchUser){
      res.status(201).send("User is changed");
    }
  },
  async deletUser (req,res){
    const userId = req.params.id;
    const deleteUser = await userDataMapper.deleteUser(userId);
    if(deleteUser){
      res.send("User is deleted");
    } else{
      res.send ("Error, user can't be deleted ")
    }
  },

  

};

module.exports = userController;
