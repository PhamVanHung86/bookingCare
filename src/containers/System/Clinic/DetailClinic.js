import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../../Patient/Doctor/DoctorSchedule";
import DoctorExtraInfo from "../../Patient/Doctor/DoctorExtraInfo";
import ProfileDoctor from "../../Patient/Doctor/ProfileDoctor";
import _ from "lodash";

import {
  getAllDetailClinicByIdService,
} from "../../../services/userService";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailClinicByIdService({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];

        if (data && !_.isEmpty(data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            // eslint-disable-next-line array-callback-return
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  handleChangeSelect = (event) => {
    console.log("check onchange: ", event.target.value);
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      

      let res = await getAllDetailClinicByIdService({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];

        if (data && !_.isEmpty(data)) {
          let arr = data.doctorclinic;
          if (arr && arr.length > 0) {
            // eslint-disable-next-line array-callback-return
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;
    console.log("check state: ", this.state);

    return (
      <>
        <HomeHeader />

        <div className="detail-clinic-container ">
          <div className="detail-clinic-content">
            <div className="description-clinic container">
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) && 
                <>
                  <div>{dataDetailClinic.name}</div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetailClinic.descriptionHTML,
                    }}
                  ></div>
                </>
              }
              
            </div>

            <div className="info-schedule-clinic">
              {arrDoctorId &&
                arrDoctorId.length > 0 &&
                arrDoctorId.map((item, index) => {
                  return (
                    <div className="detail-clinic-info" key={index}>
                      <div className="content-left">
                        <div className="profile-doctor">
                          <ProfileDoctor
                            doctorId={item}
                            isShowDetailInfo={true}
                            isShowLinkDetail={true}
                            isShowPrice={false}
                          />
                        </div>
                      </div>

                      <div className="content-right">
                        <div className="schedule-doctor">
                          <DoctorSchedule doctorIdFromParent={item} />
                        </div>
                        <div className="schedule-extra-info">
                          <DoctorExtraInfo doctorIdFromParent={item} />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
