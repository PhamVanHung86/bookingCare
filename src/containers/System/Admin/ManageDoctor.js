import React, { Component } from "react";
import "./ManageDoctor.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";

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

  handleSavecontentMarkdown = () => {
    this.props.fetchSaveDetailDoctor({
      contentMarkdown: this.state.contentMarkdown,
      contentHTML: this.state.contentHTML,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
    });
  };

  handleChange = (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  render() {
    console.log("check load data: ", this.state);
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thêm thông tin doctor</div>
        <div className="manage-doctor-info">
          <div className="content-left">
            <label>Chọn bác sĩ</label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChange}
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
              Pham Van Hung
            </textarea>
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
          />
        </div>
        <button
          className="save-content-doctor"
          onClick={this.handleSavecontentMarkdown}
        >
          Lưu thông tin
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
    fetchSaveDetailDoctor: (data) => dispatch(actions.fetchSaveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
