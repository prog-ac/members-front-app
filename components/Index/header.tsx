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
      <header>
        <div className="header">
          <img src="/members-site-logo.png" className="headerLogoStyle" />
          <h4>
            <a className="headerTitleStyle" href={`/`}>
              神戸プログラミングアカデミー<br />
              <span className="headerSubTitle">~Members Site~</span>
            </a>
          </h4>
          <SimpleMenu />
        </div>
      </header>
    );
  }
}

export default Header;
