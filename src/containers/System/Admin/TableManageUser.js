import React, { Component } from "react";
import "./TableManageUser.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";


class TableManageUser extends Component {
  // Render --> Check hàm này đầu tiên
  constructor(props) {
    super(props);
    this.state = {
      userRedux: []
    };
  }

  // gọi một hàm redux action để lấy dữ liệu từ redux store
  componentDidMount() {
    this.props.fetchUserRedux();
  }
  
  // theo dõi và cập nhật trạng thái của componet dựa trên 
  // sự thay đổi từ Redux store
  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.listUsers !== this.props.listUsers){
      this.setState({
        userRedux: this.props.listUsers
      })
    }
  } 

  handleDeleteUser = (user) => {
    this.props.deleteUserRedux(user.id);
  }

  handleEditUser = (user) => {
    this.props.handleEditUserFromParentKey(user)
  }

  render() {
    let arrUsers = this.state.userRedux; 
    return (
      <div className="user-container">
        <div className="title ">Manage User</div>
        
        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>FirstName</th>
              <th>LastName</th>
              <th>Address</th>
              <th className="action"></th>
            </tr>

            {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td className="action">
                      <div className="btn-manage-user">
                        <div
                          className="btn-edit"
                          onClick={() => this.handleEditUser(item)}
                        >
                          <i class="far fa-edit"></i>
                        </div>
                        <div
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i class="fas fa-trash-alt"></i>
                        </div>
                      </div>
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

const mapStateToProps = state => {
  return {
    listUsers: state.admin.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
