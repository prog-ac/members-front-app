import Index from "../index";
import Header from "../../components/Index/header";

import React, { Component } from "react";
import firebase from "../../lib/firebase";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Link from "next/link";

class Profile extends Component {
  constructor(props: any) {
    super(props);

    this.state = {
      name: "",
      name_kana: "",
      slack_user_id: "",
      github_id: "",
      title: "",
      goal: "",
      message: "",
      image: "",
      description: "",
    };
    this.getName = this.getName.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  getName(event) {
    this.setState({
      name: event.target.value,
    });
  }
  getImage(event) {
    let image = event.target.files[0];
    this.setState({
      image: image,
    });
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div className="col-md-10" style={{ marginLeft: "200px" }}>
          <h3>プロフィール編集</h3>
          <form>
            <label>
              名前
              <br />
              <input
                type="text"
                style={{ width: "1000px" }}
                value={this.state.name}
                onChange={(event) => {
                  this.getName(event);
                }}
              />
            </label>
            <br />
            <label>
              よみがな
              <br />
              <input type="text" style={{ width: "1000px" }} />
            </label>
            <br />
            <label>
              SlackユーザーID
              <br />
              <input type="text" style={{ width: "1000px" }} />
            </label>
            <br />
            <label>
              GitHub ID
              <br />
              <input type="text" style={{ width: "1000px" }} />
            </label>
            <br />
            <label>
              学校・仕事等
              <br />
              <input type="text" style={{ width: "1000px" }} />
            </label>
            <br />
            <label>
              目標(こうなりたい！)
              <br />
              <input type="text" style={{ width: "1000px" }} />
            </label>
            <br />
            <label>
              メッセージ(よろしく等)
              <br />
              <input type="text" style={{ width: "1000px" }} />
            </label>
            <br />
            <label>
              顔画像
              <br />
              <input
                type="file"
                onChange={(event) => {
                  this.getImage(event);
                }}
              />
            </label>
            <br />
            <label>
              自由欄
              <br />
              <textarea style={{ width: "1000px", height: "300px" }} />
            </label>
          </form>

          <Button variant="contained" color="primary" onClick={this.addData}>
            登録
          </Button>
          <button style={{ margin: "1%" }}>
            {" "}
            <Link href="/">
              <a>戻る</a>
            </Link>{" "}
          </button>
        </div>
      </div>
    );
  }
}

export default Profile;
