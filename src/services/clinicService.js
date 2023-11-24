import db from "../models/index";

let createNewClinicService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name &&
        !data.address &&
        !data.descriptionMarkdown &&
        !data.descriptionHTML &&
        !data.imageBase64
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!!",
        });
      } else {
        await db.Clinic.create({
            name: data.name,
            address: data.address,
            image: data.imageBase64,
            descriptionMarkdown: data.descriptionMarkdown,
            descriptionHTML: data.descriptionHTML,
        })
        resolve({
            errCode: 0,
            errMessage: "Create New Clinic Success!!",
          });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllClinicService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Clinic.findAll({});
      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer.from(item.image, "base64").toString("binary");
          return item;
        });
      }
      resolve({
        errCode: 0,
        errMessage: "Get Clinic success!!",
        data
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailClinicByIdService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if(!inputId){
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!!",
        })
      } else {
        let data = await db.Clinic.findOne({
          where: {id: inputId},
          attributes: ['name', 'address','descriptionHTML', 'descriptionMarkdown']
        })
        if(data) {
          let doctorClinic = [];
         
          doctorClinic = await db.Doctor_Info.findAll({
              where: {clinicId : inputId},
              attributes: ["doctorId", "provinceId"]
            })
          data.doctorClinic = doctorClinic;
        } else data = {}

        resolve({
          errCode: 0,
          errMessage: "Success!!",
          data
        })
      }

    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
    createNewClinicService: createNewClinicService,
    getAllClinicService: getAllClinicService,
    getDetailClinicByIdService: getDetailClinicByIdService,
}