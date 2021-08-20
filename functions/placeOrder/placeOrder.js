const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
    <h2>Your Recent Order for ${total}</h2>
    <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Your total is <strong>$${total}</strong> due at pickup</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>`;
}

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
  const parsedBody = JSON.parse(event.body);
  console.log(parsedBody);

  // validate the data coming in
  const required = ['name', 'email', 'order'];

  for (const field of required) {
    console.log(`Checking that ${field} is good.`);
    if (!parsedBody[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the required ${field} field`,
        }),
      };
    }
  }
  // send the email

  const info = await transporter.sendMail({
    from: 'Big Saucers <bigsaucer@example.com>',
    to: `${parsedBody.name} <${parsedBody.email}>, orders@example.com`,
    subject: 'New Order!',
    html: generateOrderEmail({
      order: parsedBody.order,
      total: parsedBody.total,
    }),
  });
  // send success or error message

  // send a test email
  //   console.log(info, 'info');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success!' }),
  };
};
