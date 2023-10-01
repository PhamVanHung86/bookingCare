import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import {LANGUAGES} from "../../utils";
import { changeLanguageApp } from "../../store/actions";


class HomeHeader extends Component {

  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);

  }


  render() {
    let language = this.props.language;
    return (
      <div className="home-header-container sticky">
        <div className="home-header-content">
          <div className="left-content">
            <i class="fas fa-bars"></i>
            <div className="header-logo"></div>
          </div>
          <div className="center-content">

            <div className="child-content">
              <div><b><FormattedMessage id="home-header.specialty"/></b></div>
              <div className="subs-title"><FormattedMessage id="home-header.searchdoctor"/></div>
            </div>

            <div className="child-content">
              <div><b><FormattedMessage id="home-header.healthcare-facility"/></b></div>
              <div className="subs-title"><FormattedMessage id="home-header.select-room"/></div>
            </div>

            <div className="child-content">
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
