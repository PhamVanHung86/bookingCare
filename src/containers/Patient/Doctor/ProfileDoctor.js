import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import moment from "moment/moment";
import {
  getProfileDoctorService,
  getExtraInfoDoctorService,
} from "../../../services/userService";
import "./ProfileDoctor.scss";
import { FormattedMessage } from "react-intl";
import NumericFormat from "react-number-format";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let res = await getProfileDoctorService(this.props.doctorId);
    if (res && res.errCode === 0) {
      this.setState({
        dataProfile: res.data,
      });
    }

    let resExtra = await getExtraInfoDoctorService(this.props.doctorId);
    if (resExtra && resExtra.errCode === 0) {
      this.setState({
        extraInfo: resExtra.data,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
    }

    if (this.props.doctorId !== prevProps.doctorId) {
      let res = await getExtraInfoDoctorService(this.props.doctorId);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  capitalizeFirstLatter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    let { language, dataTime } = this.props;
    let { dataProfile, extraInfo } = this.state;

    let dayVi = "",
      dayEn = "";

    language === LANGUAGES.VI
      ? (dayVi = this.capitalizeFirstLatter(
          moment(new Date()).locale("vi").format("dddd - DD/MM")
        ))
      : (dayEn = moment(new Date()).locale("en").format("dddd - DD/MM"));

    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.firstName} ${dataProfile.lastName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }

    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="intro-content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image
                  ? dataProfile.image
                  : "khong the hien thi"
              })`,
            }}
          ></div>

          <div className="intro-content-right">
            <div className="intro-content-right-up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="intro-content-right-down">
              <div>
                {dataTime}
                <span> - </span>
                {language === LANGUAGES.VI ? dayVi : dayEn}
              </div>
              <FormattedMessage id="patient.booking-modal.priceBooking" />
            </div>
          </div>
        </div>
        <div className="examination-price">
          <FormattedMessage id="patient.extra-info-doctor.price" />
          {extraInfo &&
            extraInfo.priceTypeData &&
            language === LANGUAGES.VI && (
              <NumericFormat
                className="currency"
                value={extraInfo.priceTypeData.valueVi}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"VND"}
                renderText={(value) => <b>{value}</b>}
              />
            )}

          {extraInfo &&
            extraInfo.priceTypeData &&
            language === LANGUAGES.EN && (
              <NumericFormat
                className="currency"
                value={extraInfo.priceTypeData.valueEn}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
              />
            )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
