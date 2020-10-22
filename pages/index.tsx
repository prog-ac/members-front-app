// link file
import Header from "../components/Index/header";
import Body from "../components/Index/body";
import Footer from "../components/Index/footer";
import SignInScreen from "../components/SignInScreen";

// link library
import React, { Component, useReducer } from "react";
import firebase from "../lib/firebase";

class Index extends Component {
  state = {
    currentUser: null,
    isLoading : true
  };


  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        currentUser: user,
        isLoading : false
      });
    });
  }

  render() {

    if (this.state.isLoading){
      return(<div>Loading</div>)
    } else {
      return (
        <div>
          {this.state.currentUser ? (
            <>
              <Header />
              <Body />
              <Footer />
            </>
          ) : (
            <SignInScreen />
          )}
        </div>
      );
    }
  }
}

export default Index;
