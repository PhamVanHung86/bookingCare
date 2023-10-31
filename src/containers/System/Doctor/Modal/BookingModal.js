import React, { Component } from "react";
import { connect } from "react-redux";
import { postPatientBookAppointment } from "../../../../services/userService";
import "./BookingModal.scss";
import { LANGUAGES } from "../../../../utils";
import { FormattedMessage } from "react-intl";
import { Button, Modal } from "reactstrap";

import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import Select from "react-select";
import { toast } from "react-toastify";
import ProfileDoctor from "../../../Patient/Doctor/ProfileDoctor";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      selectedGender: "",
      genders: "",
      doctorId: "",
      timeType: "",
    };
  }

  componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      // eslint-disable-next-line array-callback-return
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedGender) => {
    this.setState({
      selectedGender: selectedGender,
    });
  };

  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      doctorId: this.props.doctorIdFromParent,
      selectedGender: this.state.selectedGender.value,
      timeType: this.props.timeType,
    });

    if (res && res.errCode === 0) {
      toast.success("Booking a new appointment success!");
      this.props.closeModalBooking();
    } else {
      toast.error("Booking a new appointment error!");
    }

    this.setState({
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: "",
      genders: "",
    })
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        toast.error("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  render() {
    let { isOpenModal, closeModalBooking } = this.props;

    //console.log("check doctorId: ", this.props.timeType)

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="lg"
        centered
      >
        <div className="booking-modal-content">
          <div className="modal-content-header">
            <span className="content-header-left">
              <FormattedMessage id="patient.booking-modal.title" />
            </span>

            <span className="content-header-right" onClick={closeModalBooking}>
              <i className="fas fa-times"></i>
            </span>
          </div>
          <div className="booking-modal-body">
            <div className="doctor-info"></div>
            <ProfileDoctor
              doctorId={this.props.doctorIdFromParent}
              dataTime={this.props.dataTime}
              dataBooking={this.props}
            />

            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.fullName" />
                </label>
                <input
                  className="form-control"
                  type="Text"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "fullName");
                  }}
                  value={this.state.fullName}
                ></input>
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.phoneNumber" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "phoneNumber");
                  }}
                  value={this.state.phoneNumber}
                ></input>
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.email" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "email");
                  }}
                  value={this.state.email}
                ></input>
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.address" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "address");
                  }}
                  value={this.state.address}
                ></input>
              </div>

              <div className="col-12 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.reason" />
                </label>
                <input
                  className="form-control"
                  onChange={(event) => {
                    this.handleOnChangeInput(event, "reason");
                  }}
                  value={this.state.reason}
                ></input>
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.birthday" />
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.handleOnchangeDatePicker}
                  value={this.state.birthday}
                />
              </div>

              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="patient.booking-modal.gender" />
                </label>
                <Select
                  value={this.state.selectedGender}
                  onChange={this.handleChangeSelect}
                  options={this.state.genders}
                ></Select>
              </div>
            </div>
          </div>
          <div className="booking-modal-footer">
            <Button
              className="px-3"
              color="primary"
              onClick={() => this.handleConfirmBooking()}
            >
              <FormattedMessage id="patient.booking-modal.btnConfirm" />
            </Button>
            <Button
              className="px-3"
              color="secondary"
              onClick={closeModalBooking}
            >
              <FormattedMessage id="patient.booking-modal.btnCancel" />
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
