// link file
import UserCard from "./UserCard";

// link library
import React, { Component, useReducer } from "react";
import firebase from "../../lib/firebase";
import Link from "next/link";

// bootstorap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

interface IState {
  allUser: any[];
}

const CardStyle = {
  color: "black",
};

class Body extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      allUser: null,
    };
  }

  async componentDidMount() {
    // ユーザー一覧を取得
    let item: any[] = [];
    await firebase
      .firestore()
      .collection("memberProfile")
      .get()
      .then((snapshot: any) => {
        snapshot.forEach((doc: any) => {
          item.push(doc.data());
        });
      })
      .catch((err) => {
        console.error(err);
      });

    this.setState({
      allUser: item,
    });
  }

  // 一度レンダリングした後、loadingを表示させ、componentDidMountの直後、
  // 再度レンダリングでユーザーのプロフを表示させる
  render() {
    if (!this.state.allUser) {
      return <div style={{ textAlign: "center" }}>Loading.....</div>;
    }
    return (
      // <UserCard alluser={this.state.allUser} />

      <Container>
        <Row>
          {this.state.allUser.map((user) => (
            <div className="col-md-3" key={user.name}>
              <a style={CardStyle}>
                <UserCard userData={user} />
              </a>
            </div>
          ))}
        </Row>
      </Container>
    );
  }
}

export default Body;
