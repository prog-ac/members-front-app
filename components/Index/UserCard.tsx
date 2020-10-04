// link file
// import Prof from "./profile";

// link library
import React, { Component, useReducer } from "react";
import { RouteProps } from "react-router";
import Modal from "react-modal";

import Link from "next/link";
import Circle from "react-circle";

// bootstorap
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

//customStylesをカスタムしてModalのサイズ設定お願いします

// const customStyles = {
//   content: {
//     top: "50%",
//     left: "50%",
//     right: "20%",
//     bottom: "-10%",
//     marginRight: "-20%",
//     transform: "translate(-50%, -50%)",
//   },
// };

const modalImageStyle = {
  width: "30%",
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
          // style={customStyles}
          contentLabel="userCard"
        >
          <div>
            <div style={{ textAlign: "center" }}>
              <img
                src={`${this.props.userData.imagePath}`}
                style={modalImageStyle}
              />
            </div>
            <div>{this.props.userData.name}</div>
            <div>{this.props.userData.slack_user_id}</div>
            <div>{this.props.userData.github_id}</div>
            <div>{this.props.userData.job}</div>
            <div>{this.props.userData.message}</div>
            <div>{this.props.userData.goal}</div>
            <div>{this.props.userData.description}</div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default UserCard;
