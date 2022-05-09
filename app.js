require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./app/router/router");
const port = process.env.PORT || 4242;

const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cross Origin middleware -- à adapter
// app.use(function (_, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: "Content-Type, Authorization, X-Requested-With",
};

app.use(cors(corsOptions));
app.use(router);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
