const nodemailer = require("nodemailer");

const Transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.AMAILADDR,
    pass: process.env.AMAILPASS,
  },
});

const sendMail = {
  sendEmailValidator(email, validationCode) {
    let mailOptions;
    let sender = "Circles Admin";
    mailOptions = {
      from: sender,
      to: email,
      subject: "Confirmation de votre adresse mail",
      html: `Veuillez suivre ce <a href=http://localhost:3000/activate/${validationCode}> lien </a> confirmer votre adresse mail. Merci`,
    };

    Transport.sendMail(mailOptions, (err, res) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });

    if (!Transport) {
      return false;
    } else {
      return true;
    }
  },

  sendResetPassword(email, resetCode) {
    let mailOptions;
    let sender = "Circles Admin";
    mailOptions = {
      from: sender,
      to: email,
      subject: "Demande de modification de mot de passe.",
      html: `
      Vous avez reçu ce mail car vous avez demandé la modification de votre mot de passe.
      Veuillez suivre ce <a href=http://localhost:3000/reset-password/${resetCode}> lien </a> confirmer votre demande.
      Merci`,
    };

    Transport.sendMail(mailOptions, (err, res) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });

    if (!Transport) {
      return false;
    } else {
      return true;
    }
  },

  InviteToCircle(email, circleCode, userExist) {
    console.log(circleCode);
    let mailOptions;
    let sender = "Circles Admin";
    mailOptions = {
      from: sender,
      to: email,
      subject: "Invitation à rejoindre un cercle.",
      html: `
      Vous avez reçu ce mail car Elon Musk vous invite à rejoindre son cercle trés privé.
      Veuillez suivre ce <a href=http://localhost:3000/invite/${circleCode}?user-exist=${userExist}> lien </a> si vous souhaitez rejoindre son cercle.
      Merci`,
    };

    Transport.sendMail(mailOptions, (err, res) => {
      if (err) {
        return false;
      } else {
        return true;
      }
    });

    if (!Transport) {
      return false;
    } else {
      return true;
    }
  },
};

module.exports = sendMail;
