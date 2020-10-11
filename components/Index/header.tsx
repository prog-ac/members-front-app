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
          <Link href={`/`}>
            <h4 className="col-md-10">
              神戸プログラミングアカデミー
              <h5 className="headerSubTitle">~Members Site~</h5>
            </h4>
          </Link>
          <SimpleMenu />
          <p></p>
        </div>
        <hr />
      </header>
    );
  }
}

export default Header;
