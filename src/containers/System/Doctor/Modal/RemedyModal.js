import React, { Component } from "react";
import { connect } from "react-redux";
import "./RemedyModal.scss";
import { CommonUtils } from "../../../../utils";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";

class RemelyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imageBase64: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.dataModal !== prevProps.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, closeRemedyModal, sendRemedy } = this.props;

    // console.log("check props: ", this.props);
    // console.log("check state: ", this.state);

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="md"
        centered
      >
        <div className="remely-modal-content">
          <div className="modal-content-header">
            <span className="content-header-left">
              Gửi hóa đơn khám bệnh thành công
            </span>
            {/* <button type='button' className="close" aria-label="Close" onClick={closeRemelyModal}>
                <span aria-hidden="true">X</span>
            </button> */}
            <span className="content-header-right" onClick={closeRemedyModal}>
              <i className="fas fa-times"></i>
            </span>
          </div>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-5 form-group ">
              <label>Email bệnh nhân</label>
              <input
                className="form-control mt-3"
                type="email"
                value={this.state.email}
                onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>

            <div className="col-7 form-group">
              <label>Chọn file đơn thuốc</label>
              <input
                className="form-control-file mt-3"
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-2"
            onClick={() => this.handleSendRemedy()}
          >
            Send
          </Button>
          <Button color="secondary" className="px-2" onClick={closeRemedyModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemelyModal);
