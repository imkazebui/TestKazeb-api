import nodemailer from 'nodemailer';

class NodeMailer {
  transporter;

  constructor(transportObject) {
    this.transporter = nodemailer.createTransport(transportObject);
  }

  sendMail(email) {
    this.transporter.sendMail(email);
  }
}

const emailSender = 'groupnhatnguyet@gmail.com';

const newEmail = new NodeMailer({
  service: 'gmail',
  auth: {
    user: emailSender,
    pass: 'Aa123456!',
  },
});

export default newEmail;
