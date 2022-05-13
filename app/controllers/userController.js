const userDataMapper = require("../datamapper/userDatamapper");
const jwbtoken = require("../middlewares/jwtMiddleware");
const bcrypt = require("bcrypt");
const { createEvent } = require("../services/addAnniversaryEvents");
const axios = require("axios").default;

const userController = {
  async getUser(req, res) {
    const { email } = req.body;
    const user = await userDataMapper.getUser(email);
    if (!user) {
      res.status(401).send("Email does not exist");
    } else {
      const givenPassword = req.body.password;
      const fetchPassword = user.password;

      const isPasswordCorrect = await bcrypt.compare(
        givenPassword,
        fetchPassword
      );
      if (!isPasswordCorrect) {
        res.status(401).send("Password is incorrect");
      } else {
        res.json({
          logged: true,
          user_id: user.id,
          surname: user.surname,
          token: jwbtoken.generateAccessToken(user.id),
        });
      }
    }
  },

  async getUserInfo(req, res) {
    const userId = req.params.id;
    const user = await userDataMapper.getUserInfo(userId);
    if (user) {
      res.json(user);
    }
  },

  async createUser(req, res) {
    let userData = req.body;
    let userPassword = req.body.password;
    //Hash of password
    userData.password = await bcrypt.hash(
      userPassword,
      Number(process.env.saltRounds)
    );

    axios
      .get("https://randomuser.me/api/")
      .then((response) => {
        userData.img_url = response.data.results[0].picture.large;
      })
      .catch((err) => console.log("unable to fetch"));
    const createdUser = await userDataMapper.createUser(userData);

    createdUser.token = jwbtoken.generateAccessToken(createdUser.id);
    if (createdUser) {
      res.json(createdUser);
    } else res.status(400).send("Bad Request");
  },

  async patchUser(req, res) {
    const userId = req.params.id;

    // Check if user exist
    const user = await userDataMapper.getUserById(userId);

    if (!user) {
      res.status(401).send("No User with this id in database ");
    } else {
      if (req.body.password || req.body.email) {
        const oldpassword = req.body.oldpassword;
        const fetchPassword = user.password;

        const isPasswordCorrect = await bcrypt.compare(
          oldpassword,
          fetchPassword
        );

        if (isPasswordCorrect) {
          delete req.body.oldpassword;

          if (req.body.password) {
            req.body.password = await bcrypt.hash(
              req.body.password,
              Number(process.env.saltRounds)
            );
          }
        }
      }

      const patchUser = await userDataMapper.patchUser(userId, req.body);

      if (patchUser) {
        res.status(201).send("User is changed");
      } else {
        res.status(502).send("User not found in database.");
      }
    }
  },

  async deletUser(req, res) {
    const userId = req.params.id;

    // Check if user exist
    const user = await userDataMapper.getUserById(userId);

    if (!user) {
      res.status(401).send("No User with this id in database ");
    } else {
      const oldpassword = req.body.oldpassword;
      const fetchPassword = user.password;

      const isPasswordCorrect = await bcrypt.compare(
        oldpassword,
        fetchPassword
      );

      if (isPasswordCorrect) {
        const deleteUser = await userDataMapper.deleteUser(userId);

        if (deleteUser) {
          res.send("User successfully deleted");
        } else {
          res.send("Error, user can't be deleted ");
        }
      }
    }
  },
  async getAllInfosFromUserId(req, res) {
    const userId = req.params.id;
    const data = await userDataMapper.getAllInfosFromUserId(userId);
    createEvent(data);
    res.json(data);
  },
};

module.exports = userController;
