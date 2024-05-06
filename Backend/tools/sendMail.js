var nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  // host: "smtppro.zoho.in",
  host: "smtp.gmail.com",
  secure: true,
  secureConnection: false, // TLS requires secureConnection to be false
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: 465,
  debug: true,
  auth: {
    user: process.env.gmail_User,
    pass: process.env.gmail_Pass,
  },
});

module.exports.Options = class Options {
  constructor(options) {
    this.from = process.env.gmail_User;
    this.to = options.to;
    this.subject = options.subject;
    this.text = options.text;
  }
};

module.exports.sendMail = function (newOptions) {
  newOptions.from = process.env.gmail_User;
  var mailOptions = newOptions;

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("------mail Test---");
      console.log("Email not sent: " + mailOptions.from);
      console.log(error);
      return false;
    } else {
      console.log("------mail Test---");
      console.log("Email sent: " + info.response);
      console.log("Email sent to: " + mailOptions.to);
      return true;
    }
  });
};
