require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = (to, token) => {
  const hostUrl = process.env.hostURL;
  const request = sg.emptyRequest({
    method: "POST",
    path: "/v3/mail/send",
    body: {
      personalizations: [
        {
          to: [
            {
              email: to
            }
          ],
          subject: "Verify Your Email"
        }
      ],
      from: {
        email: "no-reply@example.com"
      },
      content: [
        {
          type: "text/plain",
          value: `Click on this link to verify your email ${hostUrl}/verification?token=${token}&email=${to}`
        }
      ]
    }
  });
  return new Promise(function(resolve, reject) {
    sg.API(request, function(error, response) {
      if (error) {
        return reject(error);
      } else {
        return resolve(response);
      }
    });
  });
};
module.exports = sendVerificationEmail;
