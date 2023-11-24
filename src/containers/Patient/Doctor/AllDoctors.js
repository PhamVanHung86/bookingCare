import React, { Component } from "react";
import { connect } from "react-redux";
import "./AllDoctors.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import About from "../../HomePage/Section/About";
import HomeFooter from "../../HomePage/HomeFooter";
import { withRouter } from "react-router";
import { getAllDoctors } from "../../../services/userService";

class AllDoctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDoctor: [],
    };
  }

  async componentDidMount() {
    let res = await getAllDoctors();
    if (res && res.errCode === 0) {
      this.setState({
        dataDoctor: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${item.id}`);
    }
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };

  render() {
    let { dataDoctor } = this.state;

    return (
      <>
        <HomeHeader />

        <div className="all-clinics-container ">
          <div className="clinics-content container">
            <div className="header-clinic">
              <i
                className="fas fa-home"
                onClick={() => this.returnToHome()}
              ></i>
              <span>/Danh sách cơ sở y tế</span>
            </div>

            <div className="list-clinics">
              {dataDoctor &&
                dataDoctor.length > 0 &&
                // eslint-disable-next-line array-callback-return
                dataDoctor.map((item, index) => {
                  return (
                    <div
                      className="list-customize"
                      key={index}
                      onClick={() => this.handleViewDetailClinic(item)}
                    >
                      <div
                        className="bg-image"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="clinic-name">{item.name}</div>
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
  connect(mapStateToProps, mapDispatchToProps)(AllDoctors)
);
