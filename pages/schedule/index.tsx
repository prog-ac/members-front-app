import Header from "../../components/Index/header";
import Footer from "../../components/Index/footer";
import ScheduleForm from "./form";

import React, {Component} from "react";
import Link from "next/link";
import MDSpinner from "react-md-spinner";
import firebase from "../../lib/firebase";
import { Button } from "reactstrap";


class SchedulePage extends Component {
  state = {
    loading: true,
    currentUser: null,
  };
  
  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      this.setState({
        loading: false,
        currentUser: user.uid,
      });
      console.log(user.uid);
      
    });
  }

  render() {
    if (!this.state.loading) {
      return (
        <div>
          <Header />
          <div className="col-md-10">
            <h3>スケジュール追加</h3>
            <div className="text-right my-3">
              <Link href={`/`}>
                <Button>一覧へ戻る</Button>
              </Link>
            </div>
            <ScheduleForm uid={this.state.currentUser} />
          </div>
           <Footer />
        </div>
      );
    } else {
      return (
        <div className="loadingPosition">
          <MDSpinner size={100} />
        </div>
      );
    }
  }
}

export default SchedulePage;

const buttonstyle = {
  marginBottom: "10px",
};
