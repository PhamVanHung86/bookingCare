require("dotenv").config();
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
  let transporter =  nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Adam Hung 👻" <adamhungg@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
    <p>Thông tin đặt lịch khám: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu thông tin trên là chính xác, vui lòng click vào đường link 
    bên dưới để xác nhận và hoàn thành thủ tục đặt lịch khám bệnh.</p>

    <p>Nếu có bất kỳ thắc mắc nào, 
    vui lòng liên hệ với bệnh viện theo số điện thoại 098765432 hoặc booking@gmail.com.

    <div>Trân trọng,</div>
    `, // html body
  });
};

module.exports = {
  sendEmail: sendEmail,
};
