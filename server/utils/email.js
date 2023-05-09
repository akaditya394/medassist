const nodemailer = require("nodemailer");
const pug = require("pug");

const sendEmail = async (user, subject, template) => {
  let to = user.email;
  const { title, token } = subject;

  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });

  const html = pug.renderFile(`${__dirname}/../views/emails/${template}.pug`, {
    name: user.name,
    link: `Reset Password`,
  });

  let mailOptions = {
    from: `medassist<${process.env.USER_ADDRESS}>`,
    to,
    subject: title,
    html,
  };

  transport.sendMail(mailOptions, (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent successfully!");
  });
};

module.exports = sendEmail;
