const moment = require("moment-timezone");

const makeAnniversaryEvent = {
  convertBirthdate(birthdate) {
    let date = moment(birthdate).format("YYYY-MM-DD");

    let [year, month, day] = date.split("-");

    year = moment().format("YYYY");

    let result = [year, month, day].join("-");

    const currentDate = moment().tz("Europe/Paris").format("YYYY-MM-DD");

    result =
      result > currentDate
        ? result
        : (result = moment(result).add(1, "y").format("YYYY-MM-DD"));

    return result;
  },

  createEvent(data) {
    for (const elt of data) {
      for (const user of elt.users) {
        const anniversaryDate = makeAnniversaryEvent.convertBirthdate(
          user.birthdate
        );
        const anniversary = {
          start: anniversaryDate,
          end: anniversaryDate,
          color: "#FFB703",
          title: "Anniversare de " + user.surname,
          allday: true,
          description: "Anniversaire de " + user.surname,
        };

        elt.events.unshift(anniversary);
      }
    }
  },
};

module.exports = makeAnniversaryEvent;
