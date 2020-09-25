import { ArrowRight } from "@material-ui/icons";
import React, { Component } from "react";

//ヘッダの定義
function Footer() {
  return (
    <footer
      style={{
        background: "#4c70a8",
        height: 250,
        position: "relative",
      }}
    >
      <hr />
      <p
        style={{
          color: "white",
          paddingRight: 30,
          position: "absolute",
          bottom: 0,
          right: 0,
        }}
      >
        kobe-prog-ac
      </p>
    </footer>
  );
}

export default Footer;
