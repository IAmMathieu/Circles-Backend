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
};

module.exports = userController;
