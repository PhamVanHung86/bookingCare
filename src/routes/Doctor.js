/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import Header from "../containers/Header/Header";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
//import "./Doctor.scss";

class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props; 
    return (
      <>
        {isLoggedIn && <Header/>}
        <div className="system-container">
            <div className="system-list">
                <Switch>
                    <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                </Switch>
            </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
