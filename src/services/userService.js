import axios from "../axios";

// ======================= Login =========================

const handleLoginApi = (userEmail, userPassword) => {
  return axios.post("/api/login", { email: userEmail, password: userPassword });
};

// ======================= User =========================

const getAllUsers = (inputId) => {
  return axios.get(`api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", { data: { id: userId } });
};

const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};

// ======================= Allcode =========================

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

// ======================= Doctor =========================

const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};

const getDetailDoctorService = (inputData) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputData}`);
};

const saveDetailDoctor = (data) => {
  return axios.post("/api/save-info-doctor", data);
};

const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};

const getScheduleDoctorService = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};

const getExtraInfoDoctorService = (doctorId) => {
  return axios.get(`/api/get-extra-info-doctor-by-id?doctorId=${doctorId}`);
};

const getProfileDoctorService = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};

// ======================= Patient =========================

const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};

// ======================= Specialty =========================

const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-specialty", data);
};

const getAllSpecialtyService = () => {
  return axios.get("/api/get-all-specialty");
};

const getAllDetailSpecialtyByIdService = (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`
  );
};

// ======================= Clinic =========================
const createNewClinic = (data) => {
  return axios.post("/api/create-new-clinic", data);
};

const getAllClinicService = () => {
  return axios.get("/api/get-all-clinic");
};

const getAllDetailClinicByIdService = (data) => {
  return axios.get(`/api/get-detail-clinic-by-id?inputId=${data.id}`);
};

export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailDoctorService,
  saveBulkScheduleDoctor,
  getScheduleDoctorService,
  getExtraInfoDoctorService,
  getProfileDoctorService,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialtyService,
  getAllDetailSpecialtyByIdService,
  createNewClinic,
  getAllClinicService,
  getAllDetailClinicByIdService,
  getAllPatientForDoctor,
  postSendRemedy,
};
