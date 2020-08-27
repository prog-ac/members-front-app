
// link file
import Header from "./header";
import Body from "./body";
import Footer from "./footer";
import SignInScreen from "../components/SignInScreen";

import { isNull } from "util";
// link library
import React, { Component, useReducer } from 'react'
import firebase from '../lib/firebase';

class Index extends Component{

  state = {
    currentUser: isNull as null,
  };

  // コンポーネントがマウント(DOMに追加)された時(renderメソッドの直後に呼び出しされる)
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        currentUser: user,
      });
    });
  }

  // クラスコンポーネントで定義しなければいけないメソッド（マウント、更新時に呼び出される）
  // マウント、更新で呼び出される順番が異なるので注意
  render() {
    return (
      <div>
        {this.state.currentUser ? 
          <div>
            <Header />
            <Body />
            <Footer />
          </div>
        :
          <SignInScreen />
        }
      </div>
    )
  }
}

export default Index