const express = require("express");
const APIError = require("../services/APIError");
const routerWrapper = require("../middlewares/routerWrapper");
const handleError = require("../middlewares/handleError");
const router = express.Router();

// Controller User
router.post("/api/login", routerWrapper());
router.post("/api/register", routerWrapper());
router
  .route("/api/profil/:id(\\d+)")
  .get(routerWrapper())
  .patch(routerWrapper())
  .delete(routerWrapper());
router.get("/api/profil/:id/circles", routerWrapper());

//Controller Circle
router.post("/api/circle", routerWrapper());
router.post("/api/circle/:circle_id/new/:user_id", routerWrapper());

router
  .route("/api/circle/:id")
  .get(routerWrapper())
  .patch(routerWrapper())
  .delete(routerWrapper());

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

// Gestion 404 - url non reconnu
router.use((req, _) => {
  throw new APIError("This url cannot be found", req.url, 404);
});

//Gestion de l'erreur
router.use(handleError);

module.exports = router;
