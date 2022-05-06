const userDataMapper = require("../datamapper/userDatamapper");
const jwbtoken = require("../middlewares/jwtMiddleware");
const bcrypt = require("bcrypt");


const userController = {
  async getUser(req, res) {
    const { email } = req.body;
    const user = await userDataMapper.getUser(email);

    if(!user){
      res.status(401).send("Email does not exist");
    }else{
      const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
      if(!isPasswordCorrect){
        res.status(401).send("Password is incorrect");
      }else{
        res.json({
          logged: true,
          surname: user.surname,
          token: jwbtoken.generateAccessToken(user.id),
        });
      }
    };
  },

  async getUserInfo(req, res) {
    const userId = req.params.id;
    const user = await userDataMapper.getUserInfo(userId);
    res.json(user);
  },

  async createUser (req,res){
    userData = req.body
    //Hash of password
    userData.password = await bcrypt.hash(req.body.password, 10);
    const createUser= await userDataMapper.createUser(userData)
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
