// const nodemailer = require("nodemailer");
// const { htmlToText } = require("html-to-text");

// exports.emailSender = async (email, type, user, url) => {
//   const sendGridKey = functions.config().sendgrid.key;
//   try {
//     let transporter = nodemailer.createTransport({
//       host: "smtp.sendgrid.net",
//       port: 465,
//       secure: true, // true for 465, false for other ports
//       auth: {
//         user: "apikey",
//         pass: sendGridKey,
//       },
//     });

//     let subject, html;

//     switch (type) {
//       case "passwordRecovery":
//         subject = "Password Reset";
//         html = `<div>
//         You have requested a password reset.
//       </div><p>Please follow this link to reset your password: <a href=${url} /></p><div>
//       -Anthony "Papa" Santo
//      </div>`;
//         break;
//       case "join":
//         subject = `${user.email} wants to play chewzee with you!`;
//         html = `<div>chewzee is the best way to decide on what to eat.</div>
//         <div>
//         <p>You can find chewzee in the app store</p>
//         </div>
//         <div>Join the feast</div>
//         <div>&nbsp;</div>
//         <div>Sincerely,</div>
//         <div>chewzee team</div>
//         <div>Email: chewzeeapp@gmail.com</div>`;

//       default:
//         break;
//     }

//     await transporter.sendMail({
//       from: '"chewzee team" <chewzeeapp@gmail.com>',
//       to: email,
//       subject,
//       text: htmlToText(html, {
//         wordwrap: false,
//         tags: {
//           a: {
//             options: {
//               noLinkBrackets: true,
//               noAnchorUrl: true,
//             },
//           },
//         },
//       }),
//     });

//     return true;
//   } catch (err) {
//     console.log(err);
//     return false;
//   }
// };
