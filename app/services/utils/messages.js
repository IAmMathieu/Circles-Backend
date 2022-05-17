const moment = require("moment-timezone");

function formatMessage(userId, surname, text) {
  return {
    user_id: userId,
    surname,
    text,
    time: moment().tz("Europe/Paris").format(),
  };
}

module.exports = formatMessage;
