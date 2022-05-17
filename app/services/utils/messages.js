const moment = require("moment-timezone");

function formatMessage(surname, text) {
  return {
    surname,
    text,
    time: moment().tz("Europe/Paris").format(),
  };
}

module.exports = formatMessage;
