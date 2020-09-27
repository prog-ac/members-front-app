import React, { Component } from "react";

import SimpleMenu from "../menu";

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
          <h4 className="col-md-10">神戸プログラミングアカデミー</h4>
          <SimpleMenu />
          <p></p>
        </div>
        <hr />
      </header>
    );
  }
}

export default Header;
