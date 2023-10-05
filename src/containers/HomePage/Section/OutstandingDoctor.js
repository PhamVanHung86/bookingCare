/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutStandingDoctor.scss";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  // gọi một hàm redux action để lấy dữ liệu từ redux store
  componentDidMount() {
    this.props.loadTopDoctors();
    
  }

  // theo dõi và cập nhật trạng thái của componet dựa trên
  // sự thay đổi từ Redux store
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    //arrDoctors = arrDoctors.concat(arrDoctors).concat(arrDoctors);
    console.log("check list out standing doctor: ", this.props.topDoctorsRedux);
    return (
      <div className="section-share section-out-standing-doctor">
        <div className="section-container">
          <div className="section-header">
            <div className="title-section">
              <FormattedMessage id="homepage.outstanding-doctor"/>
            </div>
            <button className="btn-section">
              <FormattedMessage id="homepage.mor-info"/>
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
            {/* <div className="slider-customize">
                <div className="position-bg">
                  <div className="bg-image section-out-standing-doctor"></div>
                  <div className="position-text">
                    <div>Bác sĩ khoa 1</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div> */}

              
              
              
              
              
              
              
              
              
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer.from(
                      item.image,
                      "base64"
                    ).toString("binary");
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
                  return (
                      <div className="slider-customize" key={index}>
                        <div className="position-bg">
                          <div
                            className="bg-image section-out-standing-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          ></div>
                          <div className="position text-center">
                            <div>
                              {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div>Cơ xương khớp</div>
                          </div>
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
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
