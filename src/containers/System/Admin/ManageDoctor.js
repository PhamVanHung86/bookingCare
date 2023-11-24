import React, { Component } from "react";
import "./ManageDoctor.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import {
  getAllSpecialtyService,
  getDetailDoctorService,
  getExtraInfoDoctorService,
} from "../../../services/userService";
import { FormattedMessage } from "react-intl";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  // Render --> Check hàm này đầu tiên
  constructor(props) {
    super(props);
    this.state = {
      hasOldData: false,
      contentMarkdown: "",
      contentHTML: "",
      description: "",

      listDoctors: [],
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listSpecialty: [],
      listClinic: [],

      selectedDoctor: "",
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedSpecialty: "",
      selectedClinic: "",

      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  // gọi một hàm redux action để lấy dữ liệu từ redux store
  componentDidMount = () => {
    this.props.fetchAllDoctors();
    this.props.fetchRequiredGetAllDoctorInfo();
  };

  // theo dõi và cập nhật trạng thái của componet dựa trên
  // sự thay đổi từ Redux store
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;

      let dataSelectPrice = this.builDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.builDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.builDataInputSelect(resProvince, "PROVINCE");
      let dataSelectSpecialty = this.builDataInputSelect(resSpecialty, "SPECIALTY");
      let dataSelectClinic = this.builDataInputSelect(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
    // thay đổi ngôn ngữ
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors, "USERS");
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.builDataInputSelect(resPrice,"PRICE");
      let dataSelectPayment = this.builDataInputSelect(resPayment,"PAYMENT");
      let dataSelectProvince = this.builDataInputSelect(resProvince,"PROVINCE");
      let dataSelectSpecialty = this.builDataInputSelect(resSpecialty,"SPECIALTY");
      let dataDetailClinic = this.builDataInputSelect(resClinic,"CLINIC");
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataDetailClinic,
      });
    }
  };

  builDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        // eslint-disable-next-line array-callback-return
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "PRICE") {
        // eslint-disable-next-line array-callback-return
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }

      if (type === "PAYMENT" || type === "PROVINCE") {
        // eslint-disable-next-line array-callback-return
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }

      if (type === "SPECIALTY") {
        // eslint-disable-next-line array-callback-return
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "CLINIC") {
        // eslint-disable-next-line array-callback-return
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
    console.log("handleEditorChange", html, text);
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.fetchSaveDetailDoctor({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      clinicId: this.state.selectedClinic && this.state.selectedClinic.value ? this.state.selectedClinic.value : '',
      specialtyId: this.state.selectedSpecialty.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedPrice: this.state.selectedPrice.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
    // set gias tri rong sau khi chinh sua
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      selectedDoctor: "",
      selectedPayment: "",
      selectedPrice: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    });
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;

    let res_info = await getDetailDoctorService(selectedDoctor.value);
    let res_info_extra = await getExtraInfoDoctorService(selectedDoctor.value);

    if (
      res_info &&
      res_info.errCode === 0 &&
      res_info.data.Markdown.description
    ) {
      let markdown = res_info.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        clinicId = "",
        specialtyId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvince = "",
        selectedClinic= "",
        selectedSpecialty = "";

      if (res_info_extra.data) {
        addressClinic = res_info_extra.data.addressClinic;
        nameClinic = res_info_extra.data.nameClinic;
        note = res_info_extra.data.note;
        paymentId = res_info_extra.data.paymentId;
        priceId = res_info_extra.data.priceId;
        provinceId = res_info_extra.data.provinceId;
        clinicId = res_info_extra.data.clinicId
        specialtyId = res_info_extra.data.specialtyId;

        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      } else {
        console.log("check dopctor info: ");
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvince: "",
        selectedSpecialty: "",
        selectedClinic: "",
      });
      console.log("error");
    }
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleChangeSelectDoctorInfo = async (selectedDoctor, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };

    stateCopy[stateName] = selectedDoctor;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  ////----------------------------------------------------------
  ///-----------------------------------------------------------

  render() {
    let { hasOldData, listSpecialty, listClinic } = this.state;

    // console.log("check load allRequiredDoctorInfos : ", this.props.allRequiredDoctorInfo);
    // console.log("check load list payment : ", this.state.listPayment);
    // console.log("check load list price : ", this.state.listPrice);
    console.log("check load list state : ", this.state);

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="manage-doctor-info">
          <div className="content-left">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
            />
          </div>
          <div className="content-right">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>

        <div className="row more-info-extra">
          <div className="col-4 form-group p-2">
            <lable>
              <FormattedMessage id="patient.detail-doctor.choose-price" />
            </lable>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listPrice}
              placeholder={
                <FormattedMessage id="patient.detail-doctor.choose-price" />
              }
              name="selectedPrice"
            />
          </div>

          <div className="col-4 form-group p-2">
            <lable>
              <FormattedMessage id="patient.detail-doctor.select-method" />
            </lable>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfo}
              name="selectedPayment"
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="patient.detail-doctor.select-method" />
              }
            />
          </div>

          <div className="col-4 form-group p-2">
            <lable>
              <FormattedMessage id="patient.detail-doctor.select-province" />
            </lable>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfo}
              name="selectedProvince"
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="patient.detail-doctor.select-province" />
              }
            />
          </div>

          <div className="col-4 form-group p-2">
            <lable>
              <FormattedMessage id="patient.detail-doctor.clinic-name" />
            </lable>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>

          <div className="col-4 form-group p-2">
            <lable>
              <FormattedMessage id="patient.detail-doctor.clinic-address" />
            </lable>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={this.state.addressClinic}
            />
          </div>

          <div className="col-4 form-group p-2">
            <lable>
              <FormattedMessage id="patient.detail-doctor.note" />
            </lable>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={this.state.note}
            />
          </div>

          <div className="col-4 form-group p-2">
            <lable>
              <FormattedMessage id="admin.manage-doctor.specialty" />
            </lable>
            <Select
              options={this.state.listSpecialty}
              onChange={this.handleChangeSelectDoctorInfo}
              value={this.state.selectedSpecialty}
              name="selectedSpecialty"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.specialty" />
              }
            />
          </div>

          <div className="col-4 form-group p-2">
            <lable>
              <FormattedMessage id="admin.manage-doctor.select-clinic" />
            </lable>
            <Select
              options={this.state.listClinic}
              onChange={this.handleChangeSelectDoctorInfo}
              value={this.state.selectedClinic}
              name="selectedClinic"
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              }
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={this.handleSaveContentMarkdown}
          className={
            hasOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

// ánh xạ giá trị từ redux state vào props của một component
const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchSaveDetailDoctor: (data) =>
      dispatch(actions.fetchSaveDetailDoctor(data)),
    fetchRequiredGetAllDoctorInfo: () =>
      dispatch(actions.fetchRequiredGetAllDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
