// link file
// import Prof from "./profile";

// link library
import React, { Component, useReducer } from "react";
import { RouteProps } from "react-router";
import Modal from "react-modal";
import Backdrop from "@material-ui/core/Backdrop";

import Link from "next/link";
import Circle from "react-circle";

// bootstorap
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

//customStylesをカスタムしてModalのサイズ設定お願いします

const customStyles = {
  content: {
    top: "10%",
    left: "50%",
    right: "20%",
    bottom: "-10%",
    marginRight: "-20%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("body");
interface Istate {
  isModalOpen: boolean;
}

class UserCard extends Component<RouteProps, Istate> {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  openModal() {
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  // 一度レンダリングした後、loadingを表示させ、componentDidMountの直後、
  // 再度レンダリングでユーザーのプロフを表示させる
  render() {
    return (
      <div>
        <button onClick={this.openModal} className="cardSize">
          <Card>
            <img
              src={`${this.props.userData.imagePath}`}
              className="imageSize"
            />
          </Card>
          <Card.Title className="titlePosition">
            {this.props.userData.name}
          </Card.Title>
          <Card.Text className="messagePosition">{`「”${this.props.userData.message}”」`}</Card.Text>
        </button>

        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.closeModal}
          contentLabel="userCard"
          className="customStyles"
          openTimeoutMS={2000}
          closeTimeoutMS={200}
        >
          <div>
            <div className="modalImagePosition">
              <img
                src={`${this.props.userData.imagePath}`}
                className="modalImageStyle"
              />
            </div>
            <div className="modalFontStyle-Name">
              氏名 : {this.props.userData.name}
            </div>
            <div className="modalFontStyle">
              Slack_ID : {this.props.userData.slack_user_id}
            </div>
            <div className="modalFontStyle">
              Github_ID : {this.props.userData.github_id}
            </div>
            <div className="modalFontStyle">
              職業 : {this.props.userData.job}
            </div>
            <div className="modalFontStyle">
              一言 : {this.props.userData.message}
            </div>
            <div className="modalFontStyle">
              目標 : {this.props.userData.goal}
            </div>
            <div className="modalFontStyle">
              自由欄 : {this.props.userData.description}
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserCard;
