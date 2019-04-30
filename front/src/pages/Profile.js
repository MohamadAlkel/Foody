import React, { Component } from 'react';
import { Card, Button, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody } from 'reactstrap';
  import pro from '../styles/img/pro.jpg'
import '../styles/profile.css';


class Profile extends Component {
  render() {
    return (
    <div className="topSpace">
      <CardColumns className="cardStyle">

        <Card >
        <div className="warpCard">
          <div className="colors">
            <div className="row">
              <div className=" user">
                <CardImg top className="userImg"  src={pro} alt="Card image cap" />
                <div className="userText">
                  <CardSubtitle className="usernamePost">username</CardSubtitle>
                  <CardText className="timePost">time.</CardText>
                </div>
              </div>
            </div>

            <div className="row">
              <CardTitle className="recipeHead">Foodtext</CardTitle>
            </div>

            <CardImg top width="100%" className="recipeImg" src={pro} alt="Card image cap" />

            <div className="row">
            <div className="cir">
              ❤
            </div>
              <CardTitle className="recipeHead">Foodtext</CardTitle>
            </div>
          </div>  

          {/* <div className="row">
            <CardTitle className="ingred">Ingredients</CardTitle>
          </div> */}
          
          <CardBody className="colorsTwo">
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            <Button>Button</Button>
          </CardBody>
        </div>
        </Card>

        <Card >

          <div className="row">
            <div className="col-3">
              <CardImg top height="62px"  src={pro} alt="Card image cap" />
            </div>
            <div className="col-9">
              <CardSubtitle>username</CardSubtitle>
              <CardText>time.</CardText>
            </div>

          </div>

          <CardTitle>Card title</CardTitle>
          <CardImg top width="100%" src={pro} alt="Card image cap" />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>

        <Card >

          <div className="row">
            <div className="col-3">
              <CardImg top height="62px"  src={pro} alt="Card image cap" />
            </div>
            <div className="col-9">
              <CardSubtitle>username</CardSubtitle>
              <CardText>time.</CardText>
            </div>

          </div>

          <CardTitle>Card title</CardTitle>
          <CardImg top width="100%" src={pro} alt="Card image cap" />
          <CardBody>
            <CardTitle>Card title</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>

        
      
      </CardColumns>
    </div>
    )
  }
}


export default Profile;
