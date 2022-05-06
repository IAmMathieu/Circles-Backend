const { generate } = require("../services/uniqueCodeGenerator");
const circleDatamapper = require("../datamapper/circleDatamapper");
const jwbtoken = require("../middlewares/jwtMiddleware");

const circleController = {
  async getCircle(req, res) {
    const circleId = req.params.id;

    const circle = await circleDatamapper.getCircle(circleId);

    res.json(circle);
  },

  async createCircle(req, res) {
    const circleData = {
      name: req.body.name,
      description: req.body.description,
      color: req.body.color,
      img_url: req.body.img_url,
      user_id: req.body.user_id,
      unique_code: await generate(),
    };
    console.log(circleData);
    const circle = await circleDatamapper.createCircle(circleData);

    res.json(circle);
  },

  async updateCircle(req, res) {
    const circleId = req.params.id;

    const circle = await circleDatamapper.updateCircle(circleId, req.body);

    res.json(circle);
  },

  async deleteCircle(req, res) {
    const circleId = req.params.id;

    const circle = await circleDatamapper.deleteCircle(circleId, req.body);

    res.status(204).json();
  },

  async addUserToCircle(req, res) {
    const userId = req.params.user_id;
    const uniqueCode = req.body.unique_code;

    const circle = await circleDatamapper.addUserToCircle(userId, uniqueCode);

    if (circle) {
      res.status(200).send("User added to circle");
    } else {
      res.status(400).send("Bad request or incorrect informations");
    }
  },

  async removeUserFromCircle(req, res) {
    const userId = req.params.user_id;
    const circleId = req.body.circle_id;

    const circle = await circleDatamapper.removeUserFromCircle(
      userId,
      circleId
    );

    res.status(204).json();
  },
};

module.exports = circleController;
