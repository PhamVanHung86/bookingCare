import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeBanner.scss";
import { FormattedMessage } from "react-intl";
import {LANGUAGES} from "../../utils";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions";


class HomeBanner extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  }

  render() {
    return (
      <div className="home-banner-container">     
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1"><FormattedMessage id="banner.titel1"/></div>
            <div className="title2"><FormattedMessage id="banner.titel2"/></div>
            <div className="search">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Tìm kiếm chuyên khoa"/>
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-hospital"></i></div>
                <div className="text-child"><FormattedMessage id="banner.specialty-examination"/></div>
              </div>
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-mobile-alt"></i></div>
                <div className="text-child"><FormattedMessage id="banner.remote-examination"/></div>
              </div>
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-stethoscope"></i></div>
                <div className="text-child"><FormattedMessage id="banner.general-examination"/></div>
              </div>
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-vial"></i></div>
                <div className="text-child"><FormattedMessage id="banner.medical-testing"/></div>
              </div>  
              <div className="option-child">
                <div className="icon-child"><i className="fas fa-medkit"></i></div>
                <div className="text-child"><FormattedMessage id="banner.mental-health"/></div>
              </div>  
              <div className="option-child">
                <div className="icon-child"><i class="fas fa-syringe"></i></div>
                <div className="text-child"><FormattedMessage id="banner.dental-examination"/></div>
              </div>  
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeBanner));
