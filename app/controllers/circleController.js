const { generateCircle } = require("../services/utils/uniqueCodeGenerator");
const circleDatamapper = require("../datamapper/circleDatamapper");
const sanitizeHtml = require("sanitize-html");
const sendMail = require("../services/mailer");
const userDataMapper = require("../datamapper/userDatamapper");
const jwbtoken = require("../middlewares/jwtMiddleware");
const bcrypt = require("bcrypt");

const circleController = {
  async getCircle(req, res) {
    const circleId = req.params.id;

    const circle = await circleDatamapper.getCircle(circleId);

    res.json(circle);
  },

  async createCircle(req, res) {
    const circleData = {
      name: sanitizeHtml(req.body.name),
      description: sanitizeHtml(req.body.description),
      color: sanitizeHtml(req.body.color),
      img_url: sanitizeHtml(req.body.img_url),
      user_id: req.body.user_id,
      unique_code: await generateCircle(),
    };
    const circle = await circleDatamapper.createCircle(circleData);

    res.json(circle);
  },

  async updateCircle(req, res) {
    const circleId = req.params.id;

    (req.body.name = sanitizeHtml(req.body.name)),
      (req.body.description = sanitizeHtml(req.body.description)),
      (req.body.color = sanitizeHtml(req.body.color)),
      (req.body.img_url = sanitizeHtml(req.body.img_url)),
      console.log(req.body);

    const circle = await circleDatamapper.updateCircle(circleId, req.body);

    res.json(circle);
  },

  async deleteCircle(req, res) {
    const circleId = req.params.id;

    const circle = await circleDatamapper.deleteCircle(
      circleId,
      req.body.user_id
    );

    if (circle) {
      res.status(200).send("Circle successfully deleted.");
    } else {
      res.status(400).send("Bad request or incorrect informations");
    }
  },

  async addUserToCircle(req, res) {
    const userId = req.params.user_id;
    const uniqueCode = sanitizeHtml(req.body.unique_code);

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

    if (circle) {
      res.status(204);
    } else {
      res.status(400).send("Bad request or incorrect informations");
    }
  },

  async getCirclesForUser(req, res) {
    const userId = req.params.id;

    const circles = await circleDatamapper.getCirclesForUser(userId);

    res.json(circles);
  },

  async inviteToCircle(req, res) {
    const circleCode = req.body.unique_code;
    const email = req.body.email;

    const user = await userDataMapper.getUser(email);
    let userExist = false;

    if (user) {
      userExist = true;
    }

    sendMail.InviteToCircle(email, circleCode, userExist);

    if (!sendMail) {
      res.status(400).send("Email not sent.");
    } else {
      res.status(200).send("Email sent");
    }
  },

  // async joinCircle(req, res) {
  //   const unique_code = req.body.unique_code;
  //   const email = req.body.email;
  //   const password = req.body.password;

  //   const user = await userDataMapper.getUser(email);

  //   if (!user) {
  //     res.status(400).send("Email not found in database");
  //   } else {
  //     const givenPassword = password;
  //     const fetchPassword = user.password;

  //     const isPasswordCorrect = await bcrypt.compare(
  //       givenPassword,
  //       fetchPassword
  //     );

  //     if (!isPasswordCorrect) {
  //       res.status(401).send("Password is incorrect");
  //     } else {
  //       const circle = await circleDatamapper.addUserToCircle(
  //         user.id,
  //         unique_code
  //       );

  //       res.json({
  //         logged: true,
  //         user_id: user.id,
  //         surname: user.surname,
  //         token: jwbtoken.generateAccessToken(user.id),
  //       });
  //     }
  //   }
  // },
};

module.exports = circleController;
