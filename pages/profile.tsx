import Index from "./index";
import Edit from "./edit";

import React, { Component } from "react";
import firebase from "../lib/firebase";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";

class Profile extends Component {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="col-md-10" style={{ maxWidth: "100%" }}>
        <Card>
          {/* <Card.Img variant="top" src="imgURL" /> */}
          <Card.Body>
            {/* <Card.Title>{this.props.value}</Card.Title> */}
            <Card.Text>bbb</Card.Text>
          </Card.Body>
        </Card>

        {true ? (
          <button style={{ margin: "1%" }}>
            {" "}
            <Link as={`/profile/1/edit`} href={`/edit`}>
              <a className="example">編集</a>
            </Link>{" "}
          </button>
        ) : (
          <div></div>
        )}

        <button style={{ margin: "1%" }}>
          {" "}
          <Link href="/">
            <a>戻る</a>
          </Link>{" "}
        </button>
      </div>
    );
  }
}

export default Profile;
