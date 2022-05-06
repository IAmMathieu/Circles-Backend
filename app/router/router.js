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
const calendarController = require("../controllers/calendarController");

// Controller User
router.post("/api/login", routerWrapper(userController.getUser));
router.post("/api/register", routerWrapper());
router
  .route("/api/profil/:id(\\d+)")
  .get(jwbtoken.getAuthorization, routerWrapper(userController.getUserInfo))
  .patch(routerWrapper())
  .delete(routerWrapper());
router.get("/api/profil/:id/circles", routerWrapper());

//Controller Circle
router.post(
  "/api/circle",
  jwbtoken.getAuthorization,
  routerWrapper(circleController.createCircle)
);
router.post(
  "/api/circle/new/:user_id",
  jwbtoken.getAuthorization,
  routerWrapper(circleController.addUserToCircle)
);

router.delete(
  "/api/circle/remove/:user_id",
  jwbtoken.getAuthorization,
  routerWrapper(circleController.removeUserFromCircle)
);

router
  .route("/api/circle/:id")
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
  .route("/api/circle/:id/calendar")
  .get(routerWrapper())
  .post(routerWrapper())
  .patch(routerWrapper())
  .delete(routerWrapper());

// Controller Chat
router.get("/api/circle/:id/chat/", routerWrapper());
router
  .route("/api/circle/:id/chat/:userid")
  .post(routerWrapper())
  .patch(routerWrapper())
  .delete(routerWrapper());

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
