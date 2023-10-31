import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/HomeHeader";
import { LANGUAGES } from "../../../utils";
import { getDetailDoctorService } from "../../../services/userService";
import "./DetailDoctor.scss";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      
      this.setState({
        currentDoctorId: id,
      });

      let res = await getDetailDoctorService(id);
      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { language } = this.props;
    let { detailDoctor } = this.state;
    
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
    } 

    console.log("check state: ", this.state)
    console.log("check props: ", this.props)
    return (
      <>
        <HomeHeader>isShowBanner = {false}</HomeHeader>
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="intro-content-left"
              
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="intro-content-right">
              <div className="intro-content-right-up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="intro-content-right-down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>

          <div className="schedule-doctor">
            <div className="schedule-content-left">
              <DoctorSchedule
                //doctorIdFromParent = {detailDoctor && detailDoctor.id ? detailDoctor.id : -1}  
                doctorIdFromParent = {this.state.currentDoctorId}
                detailDoctor = {this.state.detailDoctor}
              />
            </div>

            <div className="schedule-content-right">
              <DoctorExtraInfo doctorIdFromParent = {this.state.currentDoctorId}/>
            </div>
          </div>
          <div className="detail-info-doctor">
          {detailDoctor &&
            detailDoctor.Markdown &&
            detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>
          <div className="comment-doctor"></div>
          </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
