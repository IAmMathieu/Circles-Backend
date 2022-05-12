const express = require("express");
const APIError = require("../services/APIError");
const routerWrapper = require("../middlewares/routerWrapper");
const handleError = require("../middlewares/handleError");
const jwbtoken = require("../middlewares/jwtMiddleware");
const app = express();
const router = express.Router();

//tous les controller
const userController = require("../controllers/userController");
const circleController = require("../controllers/circleController");
const chatController = require("../controllers/chatController");
const eventController = require("../controllers/eventController");

// Controller User
router.post("/api/login", routerWrapper(userController.getUser));
router.post("/api/register", routerWrapper(userController.createUser));

router.get(
  "/api/dashboard/:id(\\d+)",
  jwbtoken.getAuthorization,
  routerWrapper(userController.getAllInfosFromUserId)
);

router
  .route("/api/profil/:id(\\d+)")
  .get(jwbtoken.getAuthorization, routerWrapper(userController.getUserInfo))
  .patch(jwbtoken.getAuthorization, routerWrapper(userController.patchUser))
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
  routerWrapper(circleController.createCircle)
);
router.post(
  "/api/circle/new/:user_id(\\d+)",
  jwbtoken.getAuthorization,
  routerWrapper(circleController.addUserToCircle)
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
    routerWrapper(circleController.updateCircle)
  )
  .delete(
    jwbtoken.getAuthorization,
    routerWrapper(circleController.deleteCircle)
  );

//Controller Calendar
router
  .route("/api/circle/:id(\\d+)/event")
  .get(jwbtoken.getAuthorization, routerWrapper(eventController.allEvent))
  .post(jwbtoken.getAuthorization, routerWrapper(eventController.addEvent));

router
  .route("/api/circle/:circle_id(\\d+)/event/:event_id(\\d+)")
  .get(jwbtoken.getAuthorization, routerWrapper(eventController.oneEvent))
  .patch(jwbtoken.getAuthorization, routerWrapper(eventController.patchEvent))
  .delete(
    jwbtoken.getAuthorization,
    routerWrapper(eventController.deleteEvent)
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
