const moment = require("moment-timezone");

const date = "1981-04-07";

let [year, month, day] = date.split("-");

year = moment().format("YY");

const result = [year, month, day].join("-");

console.log(result);
