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
  .route("/api/profil/:id/circle/:circle_id/calendar")
  .get(jwbtoken.getAuthorization, routerWrapper(calendarController.allEvent))
  .post(jwbtoken.getAuthorization, routerWrapper(calendarController.addEvent));

router
  .route("/api/profil/:id/circle/:circle_id/calendar/:event_id")
  .get(jwbtoken.getAuthorization, routerWrapper(calendarController.oneEvent))
  .patch(
    jwbtoken.getAuthorization,
    routerWrapper(calendarController.patchEvent)
  )
  .delete(
    jwbtoken.getAuthorization,
    routerWrapper(calendarController.deleteEvent)
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
