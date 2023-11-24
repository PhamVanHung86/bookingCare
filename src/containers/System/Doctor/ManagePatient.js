/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";
import moment from "moment";
import LoadingOverlay from "react-loading-overlay";
import RemelyModal from "./Modal/RemedyModal";
import { postSendRemedy } from "../../../services/userService";

import { getAllPatientForDoctor } from "../../../services/userService";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }

  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    ///////////////////////////////////////
    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });

    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataPatient !== this.props.dataPatient) {
    }
  }

  handleChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnRemedy = () => {};

  handleBtnConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };

    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;

    this.setState({
      isShowLoading: true,
    });

    let res = await postSendRemedy({
      email: dataChild.email,
      doctorId: dataModal.doctorId,
      imageBase64: dataChild.imageBase64,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });

    if (res && res.errCode === 0) {
      this.setState({
        isShowLoading: false,
      });
      toast.success("Send Remedy Success!!!");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Send Remedy Failed!!!");
      console.log("Error send remedy: ", res);
    }
  };

  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container">
            <div className="manage-patient-title">
              <FormattedMessage id="manage-patient.title" />
            </div>
            <div className="container">
              <div className="row">
                {/* <div className="col-6 form-group">
              <lable>
                <FormattedMessage id="manage-patient.choose-doctor" />
              </lable>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
              ></Select>
            </div> */}

                <div className="col-6 form-group">
                  <lable>
                    <FormattedMessage id="manage-patient.choose-date" />
                  </lable>
                  <DatePicker
                    onChange={this.handleChangeDatePicker}
                    className="form-control"
                    value={this.state.currentDate}
                  />
                </div>

                <div className="patient-table mt-3 mx-1">
                  <table id="customers">
                    <tr id="customers-row">
                      <th>STT</th>
                      <th>Thời gian</th>
                      <th>Họ và tên</th>
                      <th>Địa chỉ</th>
                      <th>Giới tính</th>
                      <th id="action">Action</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeTypeDataPatient.valueVi
                            : item.timeTypeDataPatient.valueEn;

                        let gender =
                          language === LANGUAGES.VI
                            ? item.patientData.genderData.valueVi
                            : item.patientData.genderData.valueEn;

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{gender}</td>
                            <td className="action-confirm">
                              <button
                                className="btn-confirm"
                                onClick={() => this.handleBtnConfirm(item)}
                              >
                                Xác nhận
                              </button>
                              <button
                                className="btn-remedy"
                                onClick={() => this.handleBtnRemedy()}
                              >
                                Hủy
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>no data</tr>
                    )}
                  </table>
                </div>

                {/* <div className="col-12">
              <button
                className="btn btn-primary btn-save-patient"
                onClick={() => this.handleSavepatient()}
              >
                <FormattedMessage id="manage-patient.save" />
              </button>
            </div> */}
              </div>
            </div>
          </div>
          <RemelyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    user: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    // fetchAllpatientTime: () => dispatch(actions.fetchAllpatientTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
