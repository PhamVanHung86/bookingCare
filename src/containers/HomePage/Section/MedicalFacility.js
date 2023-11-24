/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";
import { LANGUAGES } from "../../../utils";
import { getAllClinicService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrClinics: [],
    };
  }

  // gọi một hàm redux action để lấy dữ liệu từ redux store
  async componentDidMount() {
    let res = await getAllClinicService();
    if (res && res.errCode === 0) {
      this.setState({
        arrClinics: res.data ? res.data : [],
      });
    }
  }

  // theo dõi và cập nhật trạng thái của componet dựa trên
  // sự thay đổi từ Redux store
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrClinics: this.props.topDoctorsRedux,
      });
    }
  }

  handleViewDetailClinic = (clinic) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
      //console.log("check file outstanding: ", doctor.id)
    }
  };

  handleViewAllClinics = () => {
    if (this.props.history) {
      this.props.history.push({ pathname: "/all-clinics" });
    }
  };

  render() {
    let { arrClinics } = this.state;
    let { language } = this.props;

    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <div className="title-section">
              <FormattedMessage id="homepage.outstanding-clinic" />
            </div>
            <button className="btn-section" onClick={() => this.handleViewAllClinics()}>
              <FormattedMessage id="homepage.search" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrClinics &&
                arrClinics.length > 0 &&
                arrClinics.map((item, index) => {
                  return (
                    <div
                      className="slider-customize"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div className="clinic-child">
                        <div
                          className="bg-image"
                          style={{ backgroundImage: `url(${item.image})` }}
                        ></div>
                        <div className="clinic-name">{item.name}</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
