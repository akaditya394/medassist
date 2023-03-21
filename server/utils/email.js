// nodemailer code to be written here
const nodemailer = require("nodemailer");

const sendEmail = async (user, subject) => {
  let to = user.email;
  const { title, token } = subject;

  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_ADDRESS,
      pass: process.env.PASSWORD,
    },
  });

  let mailOptions = {
    from: `medassist<${process.env.USER_ADDRESS}>`,
    to,
    subject: title,
    html: `<a href="http://localhost:3000/resetPassword?token=${token}">http://localhost:3000/resetPassword?token=${token}</a>`,
  };

  transport.sendMail(mailOptions, (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log("Email sent successfully!");
  });
};

module.exports = sendEmail;
