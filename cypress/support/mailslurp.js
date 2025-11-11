import { MailSlurp } from "mailslurp";

Cypress.Commands.add("getLatestOTP", (emailAddress) => {
  const mailslurp = new MailSlurp({ apiKey: Cypress.env("MAILSLURP_API_KEY") });

  return mailslurp.waitForLatestEmail(undefined, emailAddress, 30_000).then(email => {
    const otp = email.body.match(/\b\d{4,6}\b/)[0];  // Extract a 4–6 digit code
    return otp;
  });
});
