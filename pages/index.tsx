// link file
import Header from "../components/Index/header";
import Body from "../components/Index/body";
import Footer from "../components/Index/footer";
import SignInScreen from "../components/SignInScreen";

import { isNull } from "util";
// link library
import React, { Component, useReducer } from "react";
import firebase from "../lib/firebase";

class Index extends Component {
  state = {
    currentUser: isNull as null,
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        currentUser: user,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.currentUser ? (
          <div>
            <Header />
            <Body />
            <Footer />
          </div>
        ) : (
          <SignInScreen />
        )}
      </div>
    );
  }
}

export default Index;
