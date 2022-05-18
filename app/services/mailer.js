const nodemailer = require("nodemailer");

exports = module.exports = function sendEmailValidator(email, validationCode) {
  let Transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.AMAILADDR,
      pass: process.env.AMAILPASS,
    },
  });

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
};
