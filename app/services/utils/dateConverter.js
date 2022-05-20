const moment = require("moment-timezone");

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "¨Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// function dateConverter(date) {
//   const [_, month, day, year, time, ...rest] = date.split(" ");

//   let getMonth = String(months.indexOf(month) + 1);

//   if (getMonth < 10) {
//     getMonth = "0" + getMonth; // passage de 1 à 01
//   }

//   const toDate = year + "-" + getMonth + "-" + day + " " + time;

//   const formatedDate = moment(toDate).format("YYYY-MM-DD HH:mm:ss");

//   return formatedDate;
// }

function convertDate(date) {}

module.exports = dateConverter;
