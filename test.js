const axios = require("axios").default;

const userData = {
  img_url: "",
};

axios
  .get("https://randomuser.me/api/")
  .then((response) => {
    userData.img_url = response.data.results[0].picture.large;
    console.log(userData);
  })
  .catch((err) => console.log("unable to fetch"));
