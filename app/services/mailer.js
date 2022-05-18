const nodemailer = require("nodemailer");

const sendMail = {
  Transport: nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.AMAILADDR,
      pass: process.env.AMAILPASS,
    },
  }),

  sendEmailValidator(email, validationCode) {
    let mailOptions;
    let sender = "Circles Admin";
    mailOptions = {
      from: sender,
      to: email,
      subject: "Confirmation de votre adresse mail",
      html: `Veuillez suivre ce <a href=http://localhost:4242/verify/${validationCode}> lien </a> confirmer votre adresse mail. Merci`,
    };

    Transport.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Message envoyé");
      }
    });
  },

  sendCircleInvite(email, circleCode) {
    let mailOptions;
    let sender = "Circles Admin";
    mailOptions = {
      from: sender,
      to: email,
      subject: "Vous avez été invité à rejoindre une communauté sur Circles",
      html: `Veuillez suivre ce <a href=http://localhost:4242/invite/${circleCode}> lien </a> confirmer votre adresse mail. Merci`,
    };

    Transport.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Message envoyé");
      }
    });
  },
};
