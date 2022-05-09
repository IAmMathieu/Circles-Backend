const express = require("express");
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
  .patch(jwbtoken.getAuthorization,routerWrapper(userController.patchUser))
  .delete(jwbtoken.getAuthorization,routerWrapper(userController.deletUser));
router.get("/api/profil/:id/circles", routerWrapper());

//Controller Circle
router.post(
  "/api/circle",
  jwbtoken.getAuthorization,
  routerWrapper(circleController.createCircle)
);
router.post("/api/circle/:circle_id/new/:user_id", routerWrapper());

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
  .route("/api/profil/:id/circle/:circle_id/calendar")
  .get(jwbtoken.getAuthorization,routerWrapper(calendarController.allEvent))
  .post(jwbtoken.getAuthorization,routerWrapper(calendarController.addEvent))

router
  .route("/api/profil/:id/circle/:circle_id/calendar/:event_id")
  .get(jwbtoken.getAuthorization,routerWrapper(calendarController.oneEvent))
  .patch(jwbtoken.getAuthorization,routerWrapper(calendarController.patchEvent))
  .delete(jwbtoken.getAuthorization,routerWrapper(calendarController.deleteEvent));

// Controller Chat
router.get("/api/circle/:id/chat/", routerWrapper());
router
  .route("/api/circle/:id/chat/:userid")
  .post(routerWrapper())
  .patch(routerWrapper())
  .delete(routerWrapper());

//Gestion de l'erreur
router.use(handleError);

module.exports = router;
