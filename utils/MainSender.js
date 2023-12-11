// const nodemailer = require('nodemailer')
// const { catchAsync } = require('../controllers/errorController')

// const transporter = nodemailer.createTransport({
//     host: "smtp-relay.brevo.com",
//     port: 587,
//     secure: true,
//     auth: {
//         user: process.env.SMTP_USER,
//         pass: process.env.SMTP_PASSWORD,
//     },
// })

// exports.mailSender = catchAsync(async (to, subject) => {
//     const info = await transporter.sendMail({
//         from: '"Fred Foo 👻" <dev.business30@gmail.com>',
//         to: to, // list of receivers
//         subject: subject, // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     })

//     console.log("Message sent: %s", info.messageId);
//     return info;
// })