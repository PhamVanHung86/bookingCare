import React, { Component } from "react";
import { connect } from "react-redux";
import { LANGUAGES } from "../../../utils";
import { getExtraInfoDoctorService } from "../../../services/userService";
import "./DefaultClass.scss";
import { FormattedMessage } from "react-intl";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };

  render() {
    
    return (
      <>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
