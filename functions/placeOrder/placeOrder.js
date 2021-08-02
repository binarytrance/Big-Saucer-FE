const nodemailer = require('nodemailer');

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAILER_HOST,
  port: 587,
  auth: {
    user: process.env.MAILER_USER,
    pass: process.env.MAILER_PASSWORD,
  },
});

// commonjs not ES modules, therefore not export default
exports.handler = async (event, context) => {
  // send a test email
  const info = await transporter.sendMail({
    from: 'Big Saucers <bigsaucer@example.com>',
    to: 'orders@example.com',
    subject: 'New Order!',
    html: `<p>Your new pizza is here!</p>`,
  });
  //   console.log(info, 'info');
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};
