// // import nodemailer from 'nodemailer';

// // const transporter = nodemailer.createTransport({
// //   service: 'Outlook', 
// //   auth: {
// //     user: process.env.EMAIL_USER,  
// //     pass: process.env.EMAIL_PASS,  
// //   },
// // });

// // interface EmailOptions {
// //   to: string;
// //   subject: string;
// //   html: string;
// // }

// // export async function sendEmail({ to, subject, html }: EmailOptions) {
// //   const mailOptions = {
// //     from: process.env.EMAIL_USER,
// //     to,
// //     subject,
// //     html,
// //   };

// //   try {
// //     await transporter.sendMail(mailOptions);
// //     console.log('Email sent successfully');
// //   } catch (error) {
// //     console.error('Error sending email:', error);
// //   }
// // }


// import nodemailer from 'nodemailer';

// // Create a transporter object using Outlook's SMTP server
// const transporter = nodemailer.createTransport({
//   host: 'smtp.office365.com',
//   port: 587,  // Port 587 for TLS
//   secure: false,  // Use TLS
//   auth: {
//     user: process.env.EMAIL_USER,  // Your Outlook email address
//     pass: process.env.EMAIL_PASS,  // Your Outlook account password
//   },
// });

// // Function to send an email
// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
// }

// export async function sendEmail({ to, subject, html }: EmailOptions) {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,  
//     to,                             // Recipient's email
//     subject,                        // subject
//     html,                           // body 
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }


import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.APP_PASSWORD, 
  },
});

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
