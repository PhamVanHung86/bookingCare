import db from "../models/index";
require('dotenv').config();
import emailService from "./emailService";


let postBookAppointmentService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if(!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: "Missing parameter",
                  });
            } else {

                await emailService.sendEmail({
                    reciverEmail: data.email,
                    patientName: 'Adam Hung',
                    time: "9:00 - 10:00 - Thứ 3 ngày 6/8/2023",
                    doctorName: "Pham Van Hung",
                })
                // upsert Patient
                let user = await db.User.findOrCreate({
                    where: {email: data.email},
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    },
                });

                console.log("check user: ", user[0])

                // create a booking record
                if(user && user[0]){
                    await db.Booking.findOrCreate({
                        where: {patientId: user[0].id},
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            date: data.date,
                            timeType: data.timeType,
                        }
                    })
                    console.log("check user: ", user[0])
                }

                resolve({
                    errCode: 0,
                    errMessage: "Save info patient success !!"
                })
            }

        } catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    postBookAppointmentService: postBookAppointmentService,
}