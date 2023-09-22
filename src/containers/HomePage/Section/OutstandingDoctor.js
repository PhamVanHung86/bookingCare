/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutstandingDoctor.scss";
import Slider from "react-slick";

class OutstandingDoctor extends Component {
  render() {
    return (
      <div className="section-share section-out-standing-doctor">
        <div className="section-container">
          <div className="section-header">
            <div className="title-section">Bác sĩ nổi bật tuần qua</div>
            <button className="btn-section">Tìm kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="slider-customize">
                <div className="position-bg">
                  <div className="bg-image section-out-standing-doctor"></div>
                  <div className="position-text">
                    <div>Bác sĩ khoa 1</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>

              <div className="slider-customize">
                <div className="position-bg">
                  <div className="bg-image section-out-standing-doctor"></div>
                  <div className="position-text">
                    <div>Bác sĩ khoa 2</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>

              <div className="slider-customize">
                <div className="position-bg">
                  <div className="bg-image section-out-standing-doctor"></div>
                  <div className="position-text">
                    <div>Bác sĩ khoa 3</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>

              <div className="slider-customize">
                <div className="position-bg">
                  <div className="bg-image section-out-standing-doctor"></div>
                  <div className="position-text">
                    <div>Bác sĩ khoa 4</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>

              <div className="slider-customize">
                <div className="position-bg">
                  <div className="bg-image section-out-standing-doctor"></div>
                  <div className="position-text">
                    <div>Bác sĩ khoa 5</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
              </div>

              <div className="slider-customize">
                <div className="position-bg">
                  <div className="bg-image section-out-standing-doctor"></div>
                  <div className="position-text">
                    <div>Bác sĩ khoa 6</div>
                    <div>Cơ xương khớp</div>
                  </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
