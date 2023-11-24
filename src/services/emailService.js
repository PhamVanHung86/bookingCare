require("dotenv").config();
const nodemailer = require("nodemailer");

let sendEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Adam Hung 👻" <adamhungg@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend && dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
    
    <p>Thông tin đặt lịch khám: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu thông tin trên là chính xác, vui lòng click vào đường link 
    bên dưới để xác nhận và hoàn thành thủ tục đặt lịch khám bệnh.</p>
    <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
    <p>Nếu có bất kỳ thắc mắc nào, 
    vui lòng liên hệ với bệnh viện theo số điện thoại 098765432 hoặc booking@gmail.com.

    <div>Trân trọng,</div>
    `;
  }
  if (dataSend && dataSend.language === "en") {
    result = `
    <h3>Hello ${dataSend.patientName}!</h3>
    <p>You have received this email because you have made an online medical appointment on BookingCare</p>
    
    <p>Appointment details: </p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>

    <p>If the information above is correct, please click the link below to confirm and complete the appointment booking process.</p>
    <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
    <p>If you have any questions, please contact the hospital at the phone number 098765432 or email booking@gmail.com.

    <div>Best regards,</div>`;
  }

  return result;
};

let getBodyHTMLEmailRemely = (dataSend) => {
  let result = "";
  if (dataSend && dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare</p>
    
    <p>Thông tin hóa đơn/đơn thuốc được gửi trong file đính kèm</p>
    <p>Nếu có bất kỳ thắc mắc nào, 
    vui lòng liên hệ với bệnh viện theo số điện thoại 098765432 hoặc booking@gmail.com.

    <div>Trân trọng,</div>
    `;
  }
  if (dataSend && dataSend.language === "en") {
    result = `
    <h3>Hello ${dataSend.patientName}!</h3>
    <p>You are receiving this email because you have booked an online medical appointment on BookingCare.</p>
    
    <p>The invoice/prescription information is sent in the attached file.</p>
    <p>If you have any questions, please contact the hospital at the phone number 098765432 or email booking@gmail.com.

    <div>Best regards,</div>
    `;
  }

  return result;
};

let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: '"Adam Hung 👻" <adamhungg@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemely(dataSend),
        attachments: [
          {
            filename: `remely-${
              dataSend.patientId
            }-${new Date().getTime()}.png`,
            content: dataSend.imageBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });

      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendEmail: sendEmail,
  getBodyHTMLEmailRemely: getBodyHTMLEmailRemely,
  sendAttachment: sendAttachment,
};
