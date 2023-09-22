/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container">
          <div className="section-header">
            <div className="title-section">Cơ sở y tế nổi bật</div>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
          <Slider {...this.props.settings}>
            <div className="slider-customize">
              <div className="bg-image section-medical-facility"></div> 
              <div>Bệnh viện nổi bật 1</div>
            </div>
            
            <div className="slider-customize">
              <div className="bg-image section-medical-facility"></div>
              <div>Bệnh viện nổi bật 2</div>
            </div>
            
            <div className="slider-customize">
              <div className="bg-image section-medical-facility"></div>
              <div>Bệnh viện nổi bật 3</div>
            </div>

            <div className="slider-customize">
              <div className="bg-image section-medical-facility"></div>
              <div>Bệnh viện nổi bật 4</div>
            </div>

            <div className="slider-customize">
              <div className="bg-image section-medical-facility"></div>
              <div>Bệnh viện nổi bật 5</div>
            </div>

            <div className="slider-customize">
              <div className="bg-image section-medical-facility"></div>
              <div>Bệnh viện nổi bật 6</div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
