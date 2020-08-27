
// link file
import Prof from "./profile";

// link library
import React, { Component, useReducer } from 'react'
import firebase from '../lib/firebase';

import Link from 'next/link';
import Circle from 'react-circle';

// bootstorap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

// これが無いとrender()でエラーが出る
// Property 'allUser' does not exist on type 'Readonly<{}>'.
interface IState {
  allUser: any[];
}

// interfaceを使わない時はコメントアウトの部分を使用する
//class Body extends Component<{},{allUser:any}>{
class Body extends Component<{}, IState>{

  constructor(props:any){
    super(props);
    this.state = {
      allUser:null,
    }
  }

  async componentDidMount() {
    // 画像を取得
    // let bucket = "gs://kobe-prog-site.appspot.com/";
    // let storageRef = await firebase.storage().ref();
    // let imgSample = storageRef.child('test.JPG').getDownloadURL().then(function(url) {
    //   let imgURL = url;
    //   // alert(url);
    //   document.querySelector('img').src = imgURL;

    // }).catch(function(error) {
    //   alert("can not image ¥n" + error);
    // });

    // ユーザー一覧を取得
    let item:any[] = [];
    await firebase.firestore().collection('users').get().then((snapshot:any) => {
      snapshot.forEach(
        (doc:any) => {
          item.push(doc.data());
        }
      );
    });

    this.setState({
      allUser:item,
    })
  }

  // 一度レンダリングした後、loadingを表示させ、componentDidMountの直後、
  // 再度レンダリングでユーザーのプロフを表示させる
  render() {
    if (!this.state.allUser){
      return <div style={{textAlign: "center"}}>Loading.....</div>;
   }
    return (
      <div>
        {
          (
            () => {
                const items = [];
                for (let i = 0; i < this.state.allUser.length; i++) {

                  const userName = "aaa";

                  items.push(
                    <div className="col-md-4">
                      <Link value = {123}
                        // ブラウザのURLに表示されるURL
                        as={`/profile/${(i + 1)}`}
                        // ディレクトリのパス
                        href = {`/profile/`}>
                        
                        {/* URLが/about?name=testになるHTTP通信のGETと同じ? */}
                        {/* href={{ pathname: '/about', query: { name: 'test' } }}> */}

                        <a style={{color:"black"}}>
                          <Card>
                            {/* <Card.Img variant="top" src="imgURL" /> */}
                            <Card.Body>
                              <Card.Title>{ this.state.allUser[i].text }</Card.Title>
                              <Card.Text>{ this.state.allUser[i].text }</Card.Text>
                              <Card.Text>{ this.state.allUser[i].docID }</Card.Text>
                            </Card.Body>
                          </Card>
                        </a>
                      </Link>{' '}
                      <br/>
                    </div>);
              }
              return <Container>
                <Row>
                  {items}
                </Row>
              </Container>;
            }
          )()
        }
        <br />
      </div>
    )
  }

}

export default Body