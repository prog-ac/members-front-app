import Header from "../../components/Index/header";
import Footer from "../../components/Index/footer";
import React from "react";

import firebase from "../../lib/firebase";
import Link from "next/link";

import MDSpinner from "react-md-spinner";

import { Formik } from "formik";
import * as Yup from "yup";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";

import DatePicker from "react-datepicker";

// bootstorap
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";


class Schedule extends React.Component {
  state = {
    loading: true,
    open: false, //予定を詳しくみるモーダル
    currentUser: null,
    date: new Date(),
    scheduleStartTime: "",
    scheduleEndTime: "",
    scheduleName: "",
    scheduleDescription: "",
    isRemote:"いいえ",
    allUser: null,
  };

  handleOnSubmit = (values) => {
    let date:any = this.state.date;

    
    firebase
      .firestore()
      .collection("schedule")
      .doc(this.state.currentUser.uid)
      .update({ [date]: {
        scheduleStartTime: values.scheduleStartTime,
        scheduleEndTime: values.scheduleEndTime,
        scheduleName: values.scheduleName,
        scheduleDescription: values.scheduleDescription,
        isRemote:this.state.isRemote
      }});
    alert("登録しました");


    
  };

  setDate(date){
    this.setState({
      date : date
    })
  }

  setRemote = (e) =>{
    console.log(e.target)
    if(e.target.value === "いいえ"){
      this.setState({
        isRemote : "はい"
      })
    } else {
      this.setState({
        isRemote : "いいえ"
      })
    }
  }

  handleCalendarClose = () => {
    console.log("Calendar closed");
  };

  handleCalendarOpen = () => {
    console.log("Calendar opened");
  };

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      let profRef = await firebase
        .firestore()
        .collection("schedule")
        .doc(user.uid)
        .get()
        .then((doc) => {
          this.setState({
            currentUser: user,
            scheduleStartTime: doc.data().scheduleStartTime,
            scheduleEndTime: doc.data().scheduleEndTime,
            scheduleName: doc.data().scheduleName,
            scheduleDescription: doc.data().scheduleDescription,
            isRemote:doc.data().isRemote
          });
        })
        .catch(async (e) => {})
        .finally(() => {
          this.setState({
            loading: false,
            currentUser: user
          });
        });
    });

    //ユーザー一覧を取得
    let item: any[] = [];
    await firebase
      .firestore()
      .collection("schedule")
      .get()
      .then((snapshot: any) => {
        snapshot.forEach((doc: any) => {
          item.push(doc.data());
        });
      })
      .catch((err) => {
        console.error(err);
      });

    this.setState({
      allUser: item,
    });
    console.log(this.state.allUser);
  }


  render() {
    return (
      <div>
        <Header />
        <div className="col-md-10" style={{ marginLeft: "200px" }}>
          <h3>予定を入力</h3>
          <div className="text-right my-3">
            <Link href={`/`}>
              <Button>一覧へ戻る</Button>
            </Link>
          </div>
        <Formik
          initialValues={{
            date:this.state.date,
            scheduleStartTime: this.state.scheduleStartTime,
            scheduleEndTime: this.state.scheduleEndTime,
            scheduleName: this.state.scheduleName,
            scheduleDescription: this.state.scheduleDescription,
            isRemote:this.state.isRemote
          }}
          onSubmit={(values) => this.handleOnSubmit(values)}
          validationSchema={Yup.object().shape({
            scheduleStartTime: Yup.string().required("開始時間は必須です。"),
            scheduleEndTime: Yup.string().required("終了時間は必須です。"),
            scheduleName: Yup.string().required("タイトルは必須です。"),
            scheduleDescription: Yup.string().required("説明は必須です。"),
          })}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            errors,
            touched,
          }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <DatePicker
                  selected={this.state.date}
                  onChange={(date) => this.setDate(date)}
                  onCalendarClose={() => this.handleCalendarClose()}
                  onCalendarOpen={() => this.handleCalendarOpen()}
                />
                <FormFeedback>{errors.date}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="scheduleStartTime">開始時間</Label>
                <Input
                  type="time"
                  name="scheduleStartTime"
                  id="scheduleStartTime"
                  value={values.scheduleStartTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={Boolean(touched.scheduleStartTime && errors.scheduleStartTime)}
                />
                <FormFeedback>{errors.scheduleStartTime}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="scheduleEndTime">終了時間</Label>
                <Input
                  type="time"
                  name="scheduleEndTime"
                  id="scheduleEndTime"
                  value={values.scheduleEndTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={Boolean(touched.scheduleEndTime && errors.scheduleEndTime)}
                />
                <FormFeedback>{errors.scheduleEndTime}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="scheduleName">タイトル</Label>
                <Input
                  type="text"
                  name="scheduleName"
                  id="scheduleName"
                  value={values.scheduleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={Boolean(touched.scheduleName && errors.scheduleName)}
                />
                <FormFeedback>{errors.scheduleName}</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="scheduleDescription">具体的な内容</Label>
                <Input
                  type="textarea"
                  name="scheduleDescription"
                  id="scheduleDescription"
                  value={values.scheduleDescription}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={Boolean(touched.scheduleDescription && errors.scheduleDescription)}
                />
              </FormGroup>

              <FormGroup>
                <Label for="isRemote">リモート</Label>
                <Input
                  value={this.state.isRemote}
                  type="checkbox"
                  name="isRemote"
                  id="isRemote"
                  onChange={(e) => this.setRemote(e)}
                />
              </FormGroup>

              <Button style={buttonstyle} type="submit">
                登録
              </Button>
            </Form>
          )}
        </Formik>
        </div>

        

        <Container>
        <Row>
        {this.state.allUser.map((user) => (
            <div className="col-md-3" key={user.name}>
              {user.scheduleStartTime}
            </div>
          ))}
        </Row>
        </Container>


        <Footer />
      </div>
    );
  }
}

export default Schedule;

const buttonstyle = {
  marginBottom: "10px",
};
