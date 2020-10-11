import React, { Component } from "react";

import SimpleMenu from "../menu";
import Link from "next/link";

// bootstorap
import Button from "react-bootstrap/Button";

//ヘッダの定義
class Header extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <header className="headerColor">
        <div className="header">
          <img src="/members-site-logo.png" className="headerLogoStyle" />
          <div className="col-md-10">
            <h4>
              <a className="headerTitleStyle" href={`/`}>
                神戸プログラミングアカデミー
                <br />
                <span className="headerSubTitle">~Members Site~</span>
              </a>
            </h4>
          </div>
          <SimpleMenu />
          <p></p>
        </div>
        <hr />
      </header>
    );
  }
}

export default Header;
