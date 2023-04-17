const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const { SENDGRID_API_KEY } = process.env;

dotenv.config();
sgMail.setApiKey(SENDGRID_API_KEY);


const sendEmail = async (data) => {
    const email = { ...data, from: "lssova2005@gmail.com" };
  try {
    console.log(SENDGRID_API_KEY)
        await sgMail.send(email);
        return true;
    } catch (error) {
        return error;
    }
}

module.exports = sendEmail;


















// const nodemailer = require('nodemailer');
// const path = require('path');
// const pug = require('pug');
// const { convert } = require('html-to-text');

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.subscription = user.subscription;
//     this.url = url;
//     this.from = `Todos Admin <${process.env.SENDGRID_FROM}>`;
//   }

//   _initTransport() {
//     // use sendgrid for real emails
//     //   return nodemailer.createTransport({
//     //     service: 'SendGrid',
//     //     auth: {
//     //       user: process.env.SENDGRID_USERNAME,
//     //       pass: process.env.SENDGRID_APIKEY,
//     //     },
//     //   });
//     // }

//     return nodemailer.createTransport({
//       host: "sandbox.smtp.mailtrap.io",
//       port: 2525,
//       auth: {
//         user: "b8a18a00b94acc",
//         pass: "c85451d2e59db5"
//       }
//     });
//   }

//   async _send(template, subject) {
//     const html = pug.renderFile(path.join(__dirname, '..', 'views', 'emails', `${template}.pug`), {
//       name: this.subscription,
//       url: this.url,
//       subject,
//     });

//     const emailConfig = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//       text: convert(html),
//     };

//     await this._initTransport().sendMail(emailConfig);
//   }

//   async sendVerifi() {
//     await this._send('verifi', 'Welcome to our great service!!');
//   }

// };