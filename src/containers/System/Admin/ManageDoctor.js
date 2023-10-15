import React, { Component } from "react";
import "./ManageDoctor.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES, CRUD_ACTIONS } from "../../../utils";
import { getDetailDoctorService } from "../../../services/userService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  // Render --> Check hàm này đầu tiên
  constructor(props) {
    super(props);
    this.state = {
      selectedDoctor: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      listAllDoctors: [],
      hasOldData: false,
    };
  }

  // gọi một hàm redux action để lấy dữ liệu từ redux store
  componentDidMount = () => {
    this.props.fetchAllDoctors();
  };

  // theo dõi và cập nhật trạng thái của componet dựa trên
  // sự thay đổi từ Redux store
  componentDidUpdate = (prevProps, prevState, snapshot) => {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      this.setState({
        listAllDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.builDataInputSelect(this.props.allDoctors);
      this.setState({
        listAllDoctors: dataSelect,
      });
    }
  };

  builDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
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
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      selectedDoctor: this.state.selectedDoctor
    })
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );

    let res = await getDetailDoctorService(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data.Markdown.description) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
      console.log("infor ", res.data.Markdown)
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
      console.log("error")
    }
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    let { hasOldData } = this.state;
    console.log("check load data hasOldData: ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
        <div className="manage-doctor-info">
          <div className="content-left">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listAllDoctors}
            />
          </div>
          <div className="content-right">
            <label>Thông tin giới thiệu</label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) => this.handleOnChangeDescription(event)}
              value={this.state.description}
            >
            </textarea>
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
          {hasOldData === true ? <span>Save</span> : <span>Tạo thông tin</span>}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchSaveDetailDoctor: (data) =>
      dispatch(actions.fetchSaveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
