import clinicService from "../services/clinicService";

let createNewClinic = async (req, res) => {
  try {
    let info = await clinicService.createNewClinicService(req.body);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getAllClinic = async (req, res) => {
  try {
    let info = await clinicService.getAllClinicService();
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let getDetailClinicById = async (req, res) => {
  try {
    let info = await clinicService.getDetailClinicByIdService(req.query.inputId);
    return res.status(200).json(info);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  } 
}

module.exports = {
  createNewClinic: createNewClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
