import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import { CommonUtils, LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import { toast } from "react-toastify";
import _ from "lodash";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { createNewSpecialty } from "../../../services/userService";

const mdParser = new MarkdownIt();
class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new specialty success!!");
      this.setState({
        name: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        imageBase64: "",
      });
    } else {
      toast.error("Something wrongs....");
      console.log("check err: ", res);
    }
    
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="manage-specialty-title">
          <FormattedMessage id="manage-specialty.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <lable>
                <FormattedMessage id="manage-specialty.choose-specialty" />
              </lable>
              <input
                className="form-control mt-1"
                type="text"
                value={this.state.name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
              />
            </div>

            <div className="col-6 form-group mt-1 chooseImg">
              <lable>
                <FormattedMessage id="manage-specialty.choose-img" />
              </lable>
              <input
                className="form-control-file mt-1"
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
            <div className="col-12 mt-5">
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={() => this.handleSaveSpecialty()}
              >
                <FormattedMessage id="manage-specialty.save" />
              </button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
