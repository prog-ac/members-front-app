import React, { useState }  from "react";
import firebase from "../../lib/firebase";
import DatePicker, { registerLocale } from "react-datepicker";
import ja from 'date-fns/locale/ja';
registerLocale('ja', ja);

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

export default function ScheduleForm( currentUser ) {

  const [startDate, setStartDate] = useState(new Date());

  return (
    
    <>
      <DatePicker
        locale="ja"
        selected={startDate}
        dateFormat="yyyy/MM/dd"
        onChange={(date) => {setStartDate(date)}}
      />

      <Formik
        initialValues={{
          title: "",
          starttime: 10,
          endtime: 10,
          description: "",
        }}
        onSubmit={(values) => {
          const data = {
            [startDate.getFullYear().toString() + (startDate.getMonth() + 1).toString() + startDate.getDate().toString()] : {
              title: values.title,
              starttime: values.starttime,
              endtime: values.endtime,
              description: values.description,
            }
          }
          firebase.firestore().collection("test").doc(currentUser.uid).set(data).catch(() =>{
            alert("失敗");
          });
          alert("登録しました");

        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required("予定は必須です。"),
          starttime: Yup.number().required("数字を入力してください"),
          endtime: Yup.number().required("数字を入力してください"),
          description: Yup.string().required("内容を記載してください"),
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
              <Label for="title">予定</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={Boolean(touched.title && errors.title)}
              />
              <FormFeedback>{errors.title}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="starttime">開始時間</Label>
              <Input
                type="text"
                name="starttime"
                id="starttime"
                value={values.starttime}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={Boolean(touched.starttime && errors.starttime)}
              />
              <FormFeedback>{errors.starttime}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="endtime">終了時間</Label>
              <Input
                type="text"
                name="endtime"
                id="endtime"
                value={values.endtime}
                onChange={handleChange}
                onBlur={handleBlur}
                invalid={Boolean(
                  touched.endtime && errors.endtime
                )}
              />
              <FormFeedback>{errors.endtime}</FormFeedback>
            </FormGroup>
            <FormGroup>
              <Label for="description">詳細</Label>
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
            <Button type="submit">登録</Button>
          </Form>
        )}
      </Formik>
    </>
  );
}


