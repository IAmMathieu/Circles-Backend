const userDataMapper = require("../datamapper/userDatamapper");
const { generateUser } = require("../services/utils/uniqueCodeGenerator");
const { createEvent } = require("../services/utils/addAnniversaryEvents");
const sendMail = require("../services/mailer");
const jwbtoken = require("../middlewares/jwtMiddleware");
const bcrypt = require("bcrypt");
const axios = require("axios").default;
const sanitizeHtml = require("sanitize-html");
const circleDatamapper = require("../datamapper/circleDatamapper");
const e = require("express");

const userController = {
  async getUser(req, res) {
    //Sanitize req.body
    req.body.email = sanitizeHtml(req.body.email);
    const email = req.body.email;
    const user = await userDataMapper.getUser(email);

    if (!user) {
      res.status(401).send("Email does not exist");
    } else if (user.isvalid == false) {
      res.status(401).send("Email not validated");
      sendMail.sendEmailValidator(email, user.validation_code);
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
        if (!req.body.unique_code) {
          res.json({
            logged: true,
            user_id: user.id,
            surname: user.surname,
            token: jwbtoken.generateAccessToken(user.id),
          });
        } else if (req.body.unique_code != "") {
          const circle = await circleDatamapper.addUserToCircle(
            user.id,
            req.body.unique_code
          );

          res.json({
            logged: true,
            user_id: user.id,
            surname: user.surname,
            token: jwbtoken.generateAccessToken(user.id),
          });
        }
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
    req.body.unique_code = sanitizeHtml(req.body.unique_code);

    const fetchUser = await userDataMapper.getUser(req.body.email);

    if (fetchUser) {
      res.status(400).send("Email already exist in Database");
    } else {
      if (req.body.img_url == "") {
        const imgUrl = await axios.get("https://randomuser.me/api/");
        req.body.img_url = imgUrl.data.results[0].picture.large;
      }

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

        sendMail.sendEmailValidator(userData.email, userData.validationCode);

        const createdUser = await userDataMapper.createUser(userData);

        if (!createdUser) {
          res.status(400).send("Bad Request");
        } else if (
          req.body.unique_code != "" &&
          req.body.unique_code != null &&
          req.body.unique_code != undefined
        ) {
          const uniqueCode = req.body.unique_code;
          const circle = circleDatamapper.addUserToCircle(
            createdUser.user_id,
            uniqueCode
          );

          res.status(201).send("User created, waiting for email validation");
        } else {
          res.status(201).send("User created, waiting for email validation");
        }
      }
    }
  },

  async patchUser(req, res) {
    const userId = req.params.id;

    req.body.firstname = sanitizeHtml(req.body.firstname);
    req.body.lastname = sanitizeHtml(req.body.lastname);
    req.body.surname = sanitizeHtml(req.body.surname);
    req.body.email = sanitizeHtml(req.body.email);
    req.body.password = sanitizeHtml(req.body.password);
    req.body.newpassword = sanitizeHtml(req.body.newpassword);
    req.body.img_url = sanitizeHtml(req.body.img_url);
    req.body.firstConnect = sanitizeHtml(req.body.firstConnect);

    Object.keys(req.body).forEach((key) => {
      if (
        req.body[key] == "" ||
        req.body[key] == undefined ||
        req.body[key] == "undefined"
      ) {
        delete req.body[key];
      }
    });

    // Check if user exist
    const user = await userDataMapper.getUserById(userId);

    if (!user) {
      res.status(401).send("No User with this id in database ");
    } else {
      if (req.body.email) {
        if (!req.body.password) {
          delete req.body.newpassword;
          res.status(400).send("Current password is needed to change email");
        } else {
          const password = req.body.password;
          const fetchPassword = user.password;

          const isPasswordCorrect = await bcrypt.compare(
            password,
            fetchPassword
          );

          if (!isPasswordCorrect) {
            res.status(400).send("Password is incorrect");
          } else {
            req.body.password = await bcrypt.hash(
              req.body.password,
              Number(process.env.saltRounds)
            );

            const patchUser = await userDataMapper.patchUser(userId, req.body);

            if (!patchUser) {
              res.status(400).send("Bad request cant patch user");
            } else {
              res.status(200).send("User'info successfully changed");
            }
          }
        }
      } else if (req.body.newpassword) {
        if (!req.body.password) {
          delete req.body.newpassword;
          res
            .status(400)
            .send("You need to provide New AND Old password to change it");
        } else {
          const password = req.body.password;
          const fetchPassword = user.password;

          const isPasswordCorrect = await bcrypt.compare(
            password,
            fetchPassword
          );

          if (!isPasswordCorrect) {
            res.status(400).send("Password is incorrect");
          } else {
            req.body.password = await bcrypt.hash(
              req.body.newpassword,
              Number(process.env.saltRounds)
            );

            delete req.body.newpassword;
            const patchUser = await userDataMapper.patchUser(userId, req.body);

            if (!patchUser) {
              res.status(400).send("Bad request cant patch user");
            } else {
              res.status(200).send("User'info successfully changed");
            }
          }
        }
      } else {
        delete req.body.newpassword;
        delete req.body.password;
        const patchUser = await userDataMapper.patchUser(userId, req.body);

        if (!patchUser) {
          res.status(400).send("Bad request cant patch user");
        } else {
          res.status(200).send("User'info successfully changed");
        }
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
      // const password = req.body.password;
      // const fetchPassword = user.password;

      // const isPasswordCorrect = await bcrypt.compare(
      //   password,
      //   fetchPassword
      // );

      // if (isPasswordCorrect) {
      const deleteUser = await userDataMapper.deleteUser(userId);

      if (deleteUser) {
        res.send("User successfully deleted");
      } else {
        res.send("Error, user can't be deleted ");
      }
      // }
    }
  },
  async getAllInfosFromUserId(req, res) {
    const userId = req.params.id;
    const data = await userDataMapper.getAllInfosFromUserId(userId);
    createEvent(data);
    res.json(data);
  },

  async validateEmail(req, res) {
    const validationCode = req.params.code_activate;

    const user = await userDataMapper.getUserByCode(validationCode);

    console.log("userController.validateEmail User:" + user);

    if (user) {
      user.isvalid = true;
      const validatedUser = await userDataMapper.patchUserValidate(
        user.id,
        user.isvalid
      );

      console.log(
        "userController.validateEmail validatedUser:" + validatedUser
      );
      res.status(200).json({
        logged: true,
        user_id: validatedUser.id,
        surname: validatedUser.surname,
        token: jwbtoken.generateAccessToken(validatedUser.id),
      });
    }
  },

  async sendResetEmail(req, res) {
    const email = req.body.email;

    console.log("userController.sendResetEmail email :" + email);

    const user = await userDataMapper.getUser(email);

    if (!user) {
      res.status(400).send("Email not found in database.");
    } else {
      sendMail.sendResetPassword(email, user.validation_code);
      res.status(200).send("Reset password email sent");
    }
  },

  async resetPassword(req, res) {
    const resetCode = req.params.reset_code;
    let newPassword = req.body.newPassword;

    const user = await userDataMapper.getUserByCode(resetCode);

    if (!user) {
      res.status(400).send("User not found in database.");
    } else if (!newPassword) {
      res.status(400).send("Password is missing.");
    } else {
      newPassword = await bcrypt.hash(
        newPassword,
        Number(process.env.saltRounds)
      );
      const updatedUser = await userDataMapper.patchUser(user.id, {
        password: newPassword,
      });
      res.status(200).send("Password updated");
    }
  },
};

module.exports = userController;
