const moment = require("moment-timezone");

const makeAnniversaryEvent = {
  convertBirthdate(birthdate) {
    let date = moment(birthdate).format("YY-MM-DD");

    let [year, month, day] = date.split("-");

    year = moment().format("YY");

    const result = [year, month, day].join("-");

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
