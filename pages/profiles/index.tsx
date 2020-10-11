import Header from "../../components/Index/header";
import Footer from "../../components/Index/footer";
import React from "react";

import firebase from "../../lib/firebase";
import Link from "next/link";
import Router from "next/router";
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

class Profile extends React.Component {
  state = {
    loading: true,
    currentUser: null,
    name: "",
    name_kana: "",
    slack_user_id: "",
    github_id: "",
    job: "",
    goal: "",
    message: "",
    description: "",
    imagePath: "",
  };

  handleOnSubmit = (values) => {
    firebase
      .firestore()
      .collection("memberProfile")
      .doc(this.state.currentUser.uid)
      .update({
        name: values.name,
        name_kana: values.name_kana,
        slack_user_id: values.slack_user_id,
        github_id: values.github_id,
        job: values.job,
        goal: values.goal,
        message: values.message,
        description: values.description,
      });
    alert("登録しました");
    Router.push("/");
  };

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(async (user) => {
      let profRef = await firebase
        .firestore()
        .collection("memberProfile")
        .doc(user.uid)
        .get()
        .then((doc) => {
          this.setState({
            loading: false,
            currentUser: user,
            name: doc.data().name,
            name_kana: doc.data().name_kana,
            slack_user_id: doc.data().slack_user_id,
            github_id: doc.data().github_id,
            job: doc.data().job,
            goal: doc.data().goal,
            message: doc.data().message,
            description: doc.data().description,
          });
        })
        .catch(async (e) => {
          await firebase
            .firestore()
            .collection("memberProfile")
            .doc(user.uid)
            .set({
              docId: user.uid,
              name: "",
              name_kana: "",
              slack_user_id: "",
              github_id: "",
              job: "",
              goal: "",
              message: "",
              description: "",
              imagePath: "",
            });
          this.setState({
            currentUser: user,
          });
        });
    });
  }

  upLoadImage(event) {
    const file = event.target.files[0];
    firebase.auth().onAuthStateChanged(async (user) => {
      const storage = firebase.storage();
      const storageRef = storage.ref("images");
      const imagesRef = storageRef.child(`${user.uid}.jpg`);
      const upLoadTask = imagesRef.put(file);
      upLoadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("snapshot", snapshot);
        },
        (error) => {
          console.log("err", error);
        },
        () => {
          upLoadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log("File available at", downloadURL);
            firebase
              .firestore()
              .collection("memberProfile")
              .doc(this.state.currentUser.uid)
              .update({
                imagePath: downloadURL,
              });
            this.setState({
              imagePath: downloadURL,
            });
          });
        }
      );
    });
  }
  render() {
    if (!this.state.loading) {
      return (
        <div>
          <Header />
          <div className="col-md-10" style={{ marginLeft: "200px" }}>
            <h3>プロフィール編集</h3>
            <div className="text-right my-3">
              <Link href={`/`}>
                <Button>一覧へ戻る</Button>
              </Link>
            </div>
            <Formik
              initialValues={{
                name: this.state.name,
                name_kana: this.state.name_kana,
                slack_user_id: this.state.slack_user_id,
                github_id: this.state.github_id,
                job: this.state.job,
                goal: this.state.goal,
                message: this.state.message,
                description: this.state.description,
              }}
              onSubmit={(values) => this.handleOnSubmit(values)}
              validationSchema={Yup.object().shape({
                name: Yup.string().required("氏名は必須です。"),
                name_kana: Yup.string().required("読み仮名は必須です。"),
                slack_user_id: Yup.string().required("slackは必須です。"),
                github_id: Yup.string().required("githubは必須です。"),
                goal: Yup.string().required("目標は必須です。"),
                message: Yup.string().required("メッセージは必須です。"),
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
                    <Label for="name">氏名</Label>
                    <Input
                      type="text"
                      name="name"
                      id="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={Boolean(touched.name && errors.name)}
                    />
                    <FormFeedback>{errors.name}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="name_kana">読み仮名</Label>
                    <Input
                      type="text"
                      name="name_kana"
                      id="name_kana"
                      value={values.name_kana}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={Boolean(touched.name_kana && errors.name_kana)}
                    />
                    <FormFeedback>{errors.name_kana}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="slack_user_id">SlackId</Label>
                    <Input
                      type="text"
                      name="slack_user_id"
                      id="slack_user_id"
                      value={values.slack_user_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={Boolean(
                        touched.slack_user_id && errors.slack_user_id
                      )}
                    />
                    <FormFeedback>{errors.slack_user_id}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="github_id">GitHubID</Label>
                    <Input
                      type="text"
                      name="github_id"
                      id="github_id"
                      value={values.github_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={Boolean(touched.github_id && errors.github_id)}
                    />
                    <FormFeedback>{errors.github_id}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="job">仕事・学校</Label>
                    <Input
                      type="text"
                      name="job"
                      id="job"
                      value={values.job}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={Boolean(touched.job && errors.job)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="goal">目標（こうなりたい）</Label>
                    <Input
                      type="text"
                      name="goal"
                      id="goal"
                      value={values.goal}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={Boolean(touched.goal && errors.goal)}
                    />
                    <FormFeedback>{errors.goal}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="message">メッセージ</Label>
                    <Input
                      type="text"
                      name="message"
                      id="message"
                      value={values.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={Boolean(touched.message && errors.message)}
                    />
                    <FormFeedback>{errors.message}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for="description">自由欄</Label>
                    <Input
                      type="textarea"
                      name="description"
                      id="description"
                      value={values.description}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      invalid={Boolean(
                        touched.description && errors.description
                      )}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="examplefile">画像ファイル</Label>
                    <Input
                      type="file"
                      name="file"
                      id="examplefile"
                      onChange={(event) => this.upLoadImage(event)}
                    />
                  </FormGroup>

                  <Button style={buttonstyle} type="submit">
                    登録
                  </Button>
                </Form>
              )}
            </Formik>
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

export default Profile;

const buttonstyle = {
  marginBottom: "10px",
};
