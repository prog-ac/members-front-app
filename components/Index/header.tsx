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
          <Link href={`/`}>
            <h4 className="col-md-10">神戸プログラミングアカデミー</h4>
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
