const express = require("express");
const APIError = require("../services/APIError");
const routerWrapper = require("../middlewares/routerWrapper");
const handleError = require("../middlewares/handleError");
const jwbtoken = require("../middlewares/jwtMiddleware");
const app = express();
const router = express.Router();

//validation
const validationModule = require("../services/validation/validate");
const {
  registerSchema,
  loginSchema,
  patchUserSchema,
  createCircleSchema,
  addUserToCircle,
  updateCircleSchema,
  createEventSchema,
  patchEventSchema,
} = require("../services/validation/schema ");

//tous les controller
const userController = require("../controllers/userController");
const circleController = require("../controllers/circleController");
const chatController = require("../controllers/chatController");
const eventController = require("../controllers/eventController");

// Controller User
router.post(
  "/api/login",
  validationModule.validateBody(loginSchema),
  routerWrapper(userController.getUser)
);
router.post(
  "/api/register",
  validationModule.validateBody(registerSchema),
  routerWrapper(userController.createUser)
);

router.get(
  "/api/dashboard/:id(\\d+)",
  jwbtoken.getAuthorization,
  routerWrapper(userController.getAllInfosFromUserId)
);

router
  .route("/api/profil/:id(\\d+)")
  .get(jwbtoken.getAuthorization, routerWrapper(userController.getUserInfo))
  .patch(
    validationModule.validateBody(patchUserSchema),
    jwbtoken.getAuthorization,
    routerWrapper(userController.patchUser)
  )
  .delete(jwbtoken.getAuthorization, routerWrapper(userController.deletUser));
router.get(
  "/api/profil/:id(\\d+)/circles",
  jwbtoken.getAuthorization,
  routerWrapper(circleController.getCirclesForUser)
);

//Controller Circle
router.post(
  "/api/circle",
  jwbtoken.getAuthorization,
  validationModule.validateBody(createCircleSchema),
  routerWrapper(circleController.createCircle)
);
router.post(
  "/api/circle/new/:user_id(\\d+)",
  jwbtoken.getAuthorization,
  routerWrapper(circleController.addUserToCircle)
);

router.post(
  "/api/circle/invite",
  jwbtoken.getAuthorization,
  routerWrapper(circleController.inviteToCircle)
);

router.delete(
  "/api/circle/remove/:user_id(\\d+)",
  jwbtoken.getAuthorization,
  routerWrapper(circleController.removeUserFromCircle)
);

router
  .route("/api/circle/:id(\\d+)")
  .get(jwbtoken.getAuthorization, routerWrapper(circleController.getCircle))
  .patch(
    jwbtoken.getAuthorization,
    validationModule.validateBody(updateCircleSchema),
    routerWrapper(circleController.updateCircle)
  )
  .delete(
    jwbtoken.getAuthorization,
    routerWrapper(circleController.deleteCircle)
  );

//Controller Calendar
router
  .route("/api/circle/:circle_id(\\d+)/event")
  .get(jwbtoken.getAuthorization, routerWrapper(eventController.allEvent))
  .post(
    jwbtoken.getAuthorization,
    validationModule.validateBody(createEventSchema),
    routerWrapper(eventController.addEvent)
  );

router
  .route("/api/circle/event/:event_id(\\d+)")
  .get(jwbtoken.getAuthorization, routerWrapper(eventController.oneEvent))
  .patch(
    jwbtoken.getAuthorization,
    validationModule.validateBody(patchEventSchema),
    routerWrapper(eventController.patchEvent)
  )
  .delete(
    jwbtoken.getAuthorization,
    routerWrapper(eventController.deleteEvent)
  );

router
  .route("/api/message/message_id(\\d+)")
  .patch(jwbtoken.getAuthorization, routerWrapper(chatController.updateMessage))
  .delete(
    jwbtoken.getAuthorization,
    routerWrapper(chatController.deleteMessage)
  );

router.post(
  "/api/activate/:code_activate",
  routerWrapper(userController.validateEmail)
);

router.post(
  "/api/reset-password/",
  routerWrapper(userController.sendResetEmail)
);

router.post(
  "/api/reset-password/:reset_code",
  routerWrapper(userController.resetPassword)
);

// Gestion user non authentifié - url non reconnu
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("Unauthorized User");
  } else {
    next(err);
  }
});

//Gestion de l'erreur
router.use(handleError);

module.exports = router;
