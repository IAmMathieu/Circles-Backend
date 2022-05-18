const userDataMapper = require("../datamapper/userDatamapper");
const { generateUser } = require("../services/utils/uniqueCodeGenerator");
const { createEvent } = require("../services/utils/addAnniversaryEvents");
const sendEmailValidator = require("../services/mailer");
const jwbtoken = require("../middlewares/jwtMiddleware");
const bcrypt = require("bcrypt");
const axios = require("axios").default;
const sanitizeHtml = require("sanitize-html");

const userController = {
  async getUser(req, res) {
    //Sanitize req.body
    req.body.email = sanitizeHtml(req.body.email);
    const email = req.body.email;
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
    //Sanitize req.body
    req.body.firstname = sanitizeHtml(req.body.firstname);
    req.body.lastname = sanitizeHtml(req.body.lastname);
    req.body.email = sanitizeHtml(req.body.email);
    req.body.password = sanitizeHtml(req.body.password);
    req.body.img_url = sanitizeHtml(req.body.img_url);

    req.body.validationCode = await generateUser();
    req.body.isValid = false;

    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.birthdate ||
      !req.body.password
    ) {
      res.status(400).send("Bad request");
    } else {
      const userData = req.body;

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

      sendEmailValidator(userData.email, userData.validationCode);

      if (!createdUser) {
        res.status(400).send("Bad Request");
      }
    }
  },

  async patchUser(req, res) {
    const userId = req.params.id;

    req.body.firstname = sanitizeHtml(req.body.firstname);
    req.body.lastname = sanitizeHtml(req.body.lastname);
    req.body.email = sanitizeHtml(req.body.email);
    req.body.password = sanitizeHtml(req.body.password);
    req.body.img_url = sanitizeHtml(req.body.img_url);
    req.body.oldpassword = sanitizeHtml(req.body.oldpassword);

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
        res.status(400).send("Bad request or User not found");
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

  async validateEmail(req, res) {
    const validationCode = req.params.validation_code;

    const user = await userDataMapper.getUserByCode(validationCode);

    if (user) {
      user.isvalid = true;

      console.log(user);
      const validatedUser = await userDataMapper.patchUser(user.id, {
        isvalid: user.isvalid,
      });
      res.status(200).json({
        logged: true,
        user_id: validatedUser.id,
        surname: validatedUser.surname,
        token: jwbtoken.generateAccessToken(validatedUser.id),
      });
    }
  },
};

module.exports = userController;
