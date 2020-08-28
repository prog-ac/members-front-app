
// link file
import Prof from "./profile";

import BodyData from "./body";

// link library
import React, { Component, useReducer } from 'react'
import { RouteProps } from 'react-router';

import Link from 'next/link';
import Circle from 'react-circle';

// bootstorap
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FormHelperText } from "@material-ui/core";

const CardStyle = {
  color:"black",
};

class UserCard extends Component<RouteProps>{

  constructor(props) {
    super(props);

  };

  // 一度レンダリングした後、loadingを表示させ、componentDidMountの直後、
  // 再度レンダリングでユーザーのプロフを表示させる
  render() {
    return (
      <Container>
        <Row>
          { this.props.alluser.map(user =>
            <div className="col-md-4" key={user.name}>
              <Link
                // ブラウザのURLに表示されるURL
                // as={`/profile/${user.docId}`}      <- ページを更新するとエラー
                as={`/profile/`}
                // ディレクトリのパス
                href = {`/profile/`}>

                <a style={CardStyle}>
                  <Card>
                    {/* <Card.Img variant="top" src="imgURL" /> */}
                    <Card.Body>
                      <Card.Title>{ user.name }</Card.Title>
                      <Card.Text>{ user.text }</Card.Text>
                    </Card.Body>
                  </Card>
                </a>
              </Link>{' '}
            </div>
          )}
        </Row>
      </Container>
    )
  }

}

export default UserCard