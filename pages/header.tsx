import React, { Component } from "react";

import SimpleMenu from "../components/menu";

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
        <div className="header" style={{ display: "flex" }}>
          <h1 className="col-md-10" style={{ textAlign: "center" }}>
            神戸プログラミングアカデミー
          </h1>
          <SimpleMenu />
          <p></p>
        </div>
        <hr />
      </header>
    );
  }
}

export default Header;
