import React, { Component } from 'react';
import '../styles/profile.css';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody } from 'reactstrap';
  import pro from '../styles/img/pro.jpg'


class Profile extends Component {
  render() {
    return (
    <>
        <div className="topSpace">

          <Card className="block">
            <div className="col-md-6">
              <CardImg className="images" top width="100%" src={pro} alt="Card image cap" />
            </div>
            <div className="col-md-6">  
              <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardSubtitle>Card subtitle</CardSubtitle>
                <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
                <Button>Button</Button>
              </CardBody>
            </div>  

          </Card>

          <Card className="block">
            <CardImg className="images" top width="100%" src={pro} alt="Card image cap" />
            <CardBody>
              <CardTitle>Card title</CardTitle>
              <CardSubtitle>Card subtitle</CardSubtitle>
              <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <Button>Button</Button>
            </CardBody>
          </Card>

        </div>
    </>
    )
  }
}


export default Profile;
