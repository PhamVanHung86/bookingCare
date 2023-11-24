/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./HandBook.scss";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 1500,
      slidesToShow: 2,
      slidesToScroll: 2,
    };
    return (
      <div className="section-share section-handbook">
        <div className="section-container">
          <div className="section-header">
            <div className="title-section">Cẩm nang</div>
            <button className="btn-section">Tất cả bài viết</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              <div className="slider-customize">
                <div className="bg-image section-handbook"></div>
                <div className="handbook-content">Mắc bệnh tiểu đường có chữa được không?1</div>
              </div>

              <div className="slider-customize">
                <div className="bg-image section-handbook"></div>
                <div className="handbook-content">Mắc bệnh tiểu đường có chữa được không?2</div>
              </div>

              <div className="slider-customize">
                <div className="bg-image section-handbook"></div>
                <div className="handbook-content">Mắc bệnh tiểu đường có chữa được không?3</div>
              </div>

              <div className="slider-customize">
                <div className="bg-image section-handbook"></div>
                <div className="handbook-content">Mắc bệnh tiểu đường có chữa được không?4</div>
              </div>

              <div className="slider-customize">
                <div className="bg-image section-handbook"></div>
                <div className="handbook-content">Mắc bệnh tiểu đường có chữa được không?5</div>
              </div>

              <div className="slider-customize">
                <div className="bg-image section-handbook"></div>
                <div className="handbook-content">Mắc bệnh tiểu đường có chữa được không?6</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
