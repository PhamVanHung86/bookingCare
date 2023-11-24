/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="container">
          <div className="section-about-header">
            Truyền thông nói gì về BookingCare
          </div>
          <div className="section-about-content">
            <div className="left-content">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/nS1Q9f0zKOQ"
                title="Phạm Đình Thái Ngân Tuyển Chọn Hay Nhất - Top Nhạc Trẻ Hay Nhất 2023"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="right-content">
              <p>
                Rời Bỏ - Voi Bản Đôn | The Masked Singer Vietnam 2023 [Audio
                Lyrics] #TheMaskedSingerVietNam #CaSĩMặtNạ #TMS2 #VieChannel
                #VieGIẢITRÍ #VieON #DatVietVAC Tìm nghe các bản audio của Tập 5
                The Masked Singer Vietnam - Ca Sĩ Mặt Nạ Mùa 2 tại đây:
                https://WMVN.lnk.to/TMS2-EP5 Follow playlist The Masked Singer
                Vietnam - Ca Sĩ Mặt Nạ Mùa 2 để được cập nhật sớm nhất khi audio
                được phát hành:
              </p>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
