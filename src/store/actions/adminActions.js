import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
} from "../../services/userService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (e) {
      dispatch(fetchGenderFailed());
      console.log("fetchGenderStart error", e);
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (e) {
      dispatch(fetchPositionFailed());
      console.log("fetchPositionStart error", e);
    }
  };
};

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (e) {
      dispatch(fetchRoleFailed());
      console.log("fetchRoleStart error", e);
    }
  };
};



export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
        toast.error("Fetch all users error!!");
      }
    } catch (e) {
      dispatch(fetchAllUsersFailed());
      console.log("fetchAllUsersFailed: ", e);
      toast.error("Fetch all users error!!");
    }
  };
};

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});


export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
        toast.success("Delete the user succeed! ");
      } else {
        dispatch(deleteUserFailed());
        toast.error("Delete the user error! ");
      }
    } catch (e) {
      dispatch(deleteUserFailed());
      console.log("Save User Failed error", e);
      toast.error("Delete the user error! ");
    }
  };
};

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
        toast.success("Update the user succeed! ");
      } else {
        dispatch(editUserFailed());
        toast.error("Update the user error! ");
      }
    } catch (e) {
      dispatch(editUserFailed());
      console.log("Save User Failed error", e);
      toast.error("Update the user error! ");
    }
  };
};

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log(" check create user redux: ", res);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
        toast.success("Create new user success!");
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());
      console.log("save user failed", e);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
      });
      console.log("FETCH_TOP_DOCTORS_FAILED : ", e);
    }
  };
};

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
          data: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
      });
      console.log("FETCH_ALL_DOCTORS_FAILED : ", e);
    }
  };
};

export const fetchSaveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
        toast.success("Save Info Detail Doctor Sucess! ");
      } else {
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
        toast.error("Save Info Detail Doctor Failed! ");
        console.log("check err", res);
      }
    } catch (e) {
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
      toast.error("Save Info Detail Doctor Failed Catch! ");
      console.log("FETCH_ALL_DOCTORS_FAILED : ", e);
    }
  };
};


export const fetchAllScheduleTime = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
          data: res.data,
        });
        console.log("check data schedule time success", res);
        //toast.success("Save Info Detail Doctor Sucess! ");
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
        });
        // toast.error("Save Info Detail Doctor Failed! ");
         console.log("check data schedule time failed", res);
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
      });
      // toast.error("Save Info Detail Doctor Failed Catch! ");
       console.log("check data schedule time failed : ", e);
    }
  };
};

export const fetchRequiredGetAllDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      // dispatch({
      //   type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_START
      // })

      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");

      if (resPrice && resPrice.errCode === 0 
          && resPayment && resPayment.errCode === 0 
          && resProvince && resProvince.errCode === 0) {
            let data = {
              resPrice: resPrice.data,
              resPayment: resPayment.data,
              resProvince: resProvince.data,
            }
        
        dispatch(fetchRequiredDoctorInfoSuccess(data))
        //console.log("check data FETCH_REQUIRED_DOCTOR_INFO_SUCCESS data =", data);
        //toast.success("Save Info Detail Doctor Sucess! ");
      } else {
        dispatch(fetchRequiredDoctorInfoFailed());
        // toast.error("Save Info Detail Doctor Failed! ");
        console.log("check data FETCH_REQUIRED_DOCTOR_INFO_FAILED");
      }
    } catch (e) {
      dispatch(fetchRequiredDoctorInfoFailed())
      // toast.error("Save Info Detail Doctor Failed Catch! ");
       console.log("check data FETCH_REQUIRED_DOCTOR_INFO_FAILED: ", e);
    }
  };
};

export const fetchRequiredDoctorInfoSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_SUCCESS,
  data: allRequiredData
});

export const fetchRequiredDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFO_FAILED,
});