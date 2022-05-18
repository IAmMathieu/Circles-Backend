const axios = require("axios").default;

axios
  .get("https://randomuser.me/api/")
  .then((response) => {
    // userData.img_url = response.data.results[0].picture.large;
    console.log(response.data.results[0].picture.large);
  })
  .catch((err) => console.log("unable to fetch"));
