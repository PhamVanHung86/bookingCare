import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import {LANGUAGES} from "../../utils";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions";


class HomeHeader extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);

  }

  returnToHome = () => {
    if(this.props.history) {
      this.props.history.push(`/home`)
    }
  }

  handleViewAllDoctors = () => {
    if (this.props.history) {
      this.props.history.push({ pathname: "/all-doctors" });
    }
  };

  handleViewAllClinics = () => {
    if (this.props.history) {
      this.props.history.push({ pathname: "/all-clinics" });
    }
  };

  handleViewAllSpecialties = () => {
    if(this.props.history)
    {
      this.props.history.push({ pathname: "/all-specialties" })
    }
  }

  render() {
    let language = this.props.language;
    return (
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="left-content">
            <i class="fas fa-bars"></i>
            <div className="header-logo" src="assets/specialty/logo.svg" onClick={() => this.returnToHome()}></div>
          </div>
          <div className="center-content">

            <div className="child-content" onClick={() => this.handleViewAllSpecialties()}>
              <div><b><FormattedMessage id="home-header.specialty"/></b></div>
              <div className="subs-title"><FormattedMessage id="home-header.searchdoctor"/></div>
            </div>

            <div className="child-content" onClick={() => this.handleViewAllClinics()}>
              <div><b><FormattedMessage id="home-header.healthcare-facility"/></b></div>
              <div className="subs-title"><FormattedMessage id="home-header.select-room"/></div>
            </div>

            <div className="child-content" onClick={() => this.handleViewAllDoctors()}>
              <div><b><FormattedMessage id="home-header.doctor"/></b></div>
              <div className="subs-title"><FormattedMessage id="home-header.select-doctor"/></div>
            </div>

            <div className="child-content">
              <div><b><FormattedMessage id="home-header.fee"/></b></div>
              <div className="subs-title"><FormattedMessage id="home-header.check-health"/></div>
            </div>
          </div>
          <div className="right-content">
            <div className="support"><i class="far fa-question-circle"></i><FormattedMessage id="home-header.support"/></div>
            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
              <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
            </div>
            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
              <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))

  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
