// link file
// import Prof from "./profile";

// link library
import React, { Component, useReducer } from "react";
import { RouteProps } from "react-router";

import Link from "next/link";
import Circle from "react-circle";

// bootstorap
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { FormHelperText } from "@material-ui/core";

const CardStyle = {
  color: "black",
};

class UserCard extends Component<RouteProps> {
  constructor(props) {
    super(props);
  }

  // 一度レンダリングした後、loadingを表示させ、componentDidMountの直後、
  // 再度レンダリングでユーザーのプロフを表示させる
  render() {
    return (
      <>
        <Card className="cardSize">
          <Card.Body>
            <Card.Title>{this.props.userName}</Card.Title>
            <Card.Text>{this.props.text}</Card.Text>
          </Card.Body>
        </Card>
      </>
    );
  }
}

export default UserCard;
