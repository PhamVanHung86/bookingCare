/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import Slider from "react-slick";
import { getAllSpecialtyService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialtyService();
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleViewDetailSpecialty = (item) => {
    if(this.props.history) {
     this.props.history.push(`/detail-specialty/${item.id}`)
    }
  }

  handleViewAllSpecialties = (specialty) => {
    if(this.props.history)
    {
      this.props.history.push({ pathname: "/all-specialties" })
    }
  }
  render() {
    let { dataSpecialty } = this.state;
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homepage.specialty-popular" />
            </span>
            <button className="btn-section" onClick={() => this.handleViewAllSpecialties(dataSpecialty)}>
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body specialty-child">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                // eslint-disable-next-line array-callback-return
                dataSpecialty.map((item, index) => {
                  return (
                    <div className="slider-customize" key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                      <div
                        className="bg-image section-specialty"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="specialty-name">{item.name}</div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
