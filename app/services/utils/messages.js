const moment = require("moment-timezone");

function formatMessage(userId, surname, img_url, text) {
  const message = {
    user_id: userId,
    surname,
    img_url,
    text,
    time: moment().tz("Europe/Paris").format(),
  };

  return message;
}

module.exports = formatMessage;
