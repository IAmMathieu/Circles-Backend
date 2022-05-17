const moment = require("moment-timezone");

function formatMessage(userId, surname, text) {
  const message = {
    user_id: userId,
    surname,
    text,
    time: moment().tz("Europe/Paris").format(),
  };

  return message;
}

module.exports = formatMessage;
