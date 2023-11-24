import React, { Component } from "react";
import { connect } from "react-redux";
import "./AllSpecialties.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import About from "../../HomePage/Section/About";
import HomeFooter from "../../HomePage/HomeFooter";
import { withRouter } from "react-router";
import { getAllSpecialtyService } from "../../../services/userService";

class AllSpecialties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
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
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    let { dataSpecialty } = this.state;

    return (
      <>
        <HomeHeader />

        <div className="all-specialties-container ">
          <div className="specialties-content container">
            <div className="header-specialty">
              <i
                className="fas fa-home"
                onClick={() => this.returnToHome()}
              ></i>
              <span>/Danh sách chuyên khoa khám</span>
            </div>

            <div className="list-specialties">
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                // eslint-disable-next-line array-callback-return
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="list-customize"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div
                        className="bg-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="specialty-name">{item.name}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <About />
        <HomeFooter />
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllSpecialties)
);
