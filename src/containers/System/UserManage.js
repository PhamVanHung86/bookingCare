import React, { Component } from "react";
import "./UserManage.scss";
import { connect } from "react-redux";
import { getAllUsers, createNewUserService } from "../../services/userService";
import ModalUser from "./ModalUser";


class UserManage extends Component {
  // Render --> Check hàm này đầu tiên
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
    };
  }


  async componentDidMount() {
    await this.getAllUsersFromReact(); 
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    })
  }

  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    })
  }


  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);
      if(response && response.errCode !== 0)
      {
        alert(response.errMessage)
      }
      else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false
        })
      }
    } catch(e) {
      console.log(e);
    }
  }

   /**
   * Life cycle:
   * - run component  --> init state
   * - did mount (setState)
   * - render
   *
   */
  render() {
    console.log("check render: ", this.state);
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser
          isOpen = {this.state.isOpenModalUser}
          toggleFormParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        <div className="title ">Manage user with AdamHung</div>
        <div className="mx-3">
          <button 
          onClick={() => this.handleAddNewUser()}
          className="btn btn-outline-primary px-3">
            <i className="fas fa-plus mx-1"></i>
            Add New User
          </button>
        </div>
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th className="action"></th>
            </tr>

            {arrUsers &&
              arrUsers.map((item, index) => {
                return (
                  <tr>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td className="action">
                      <button className="btn-edit">
                        <i class="far fa-edit"></i>
                      </button>
                      <button className="btn-delete">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
