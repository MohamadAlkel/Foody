import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody,  Button,   
     } from 'reactstrap';
import '../styles/profile.css';
import '../styles/Portfolio.css';
import pro from '../styles/img/pro.jpg'
import time from '../styles/img/time.png'
import location from '../styles/img/location.png'





class Profile extends Component {    

  render() {
    return (
    <div>
      <div className="profilePage">
        <div className="row">
          <div className="col-md-3">
              
                <div className="userPhoto">
                    <img className="userPhoto"/>
                </div>
                <p className="username">username</p>
                <p className="job">work on</p>
                <Button color="success">Edit Profile</Button><br/>
               
          </div>

          <div className="borderLeft col-md-9">
            <div className="brief">

              <div className="row userInfo">
                <div className="col-sm-4 oneInfo">
                    <p className="numInfo">220</p>
                    <p className="aboutInfo">Recipes</p>
                </div>
                <div className=" col-sm-4 oneInfo">
                    <p className="numInfo">220</p>
                    <p className="aboutInfo">Recipes</p>
                </div>
                <div className=" col-sm-4 oneInfo">
                    <p className="numInfo">220</p>
                    <p className="aboutInfo">Recipes</p>
                </div>
              </div>

              <p className="topGreen">_ Brief</p>
              <h6 className="textBrief">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</h6>
              <Button className="btnUser" color="success">Add New Recipe</Button>
            </div>
          </div>           
        </div>
      </div>

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
            
            <CardImg top width="100%" className="recipeImg" src={pro} alt="Card image cap" />
            <CardTitle className="info"> <img className="icon" src={time} /> 03:30   <img className="icon" src={location} /> malaysia</CardTitle>

            <div className="row">
              <a className="cir" href="#" target="_blank">❤</a>
              <CardTitle className="recipeHead">Foodtext</CardTitle>
            </div>
          </div>  
          
          <CardBody className="colorsTwo">
            <div className="insideGreen">
              <CardTitle className="headGreen">_ Ingredients</CardTitle>
              <CardText className="textGreen">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <CardTitle className="headGreen">_ Directions</CardTitle>
              <CardText className="textGreen">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            </div>
          </CardBody>
        </div>
        </Card>

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
            
            <CardImg top width="100%" className="recipeImg" src={pro} alt="Card image cap" />
            <CardTitle className="info"> <img className="icon" src={time} /> 03:30   <img className="icon" src={location} /> malaysia</CardTitle>

            <div className="row">
              <a className="cir" href="#" target="_blank">❤</a>
              <CardTitle className="recipeHead">Foodtext</CardTitle>
            </div>
          </div>  
          
          <CardBody className="colorsTwo">
            <div className="insideGreen">
              <CardTitle className="headGreen">_ Ingredients</CardTitle>
              <CardText className="textGreen">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <CardTitle className="headGreen">_ Directions</CardTitle>
              <CardText className="textGreen">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            </div>
          </CardBody>
        </div>
        </Card>

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
            
            <CardImg top width="100%" className="recipeImg" src={pro} alt="Card image cap" />
            <CardTitle className="info"> <img className="icon" src={time} /> 03:30   <img className="icon" src={location} /> malaysia</CardTitle>

            <div className="row">
              <a className="cir" href="#" target="_blank">❤</a>
              <CardTitle className="recipeHead">Foodtext</CardTitle>
            </div>
          </div>  
          
          <CardBody className="colorsTwo">
            <div className="insideGreen">
              <CardTitle className="headGreen">_ Ingredients</CardTitle>
              <CardText className="textGreen">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
              <CardTitle className="headGreen">_ Directions</CardTitle>
              <CardText className="textGreen">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
            </div>
          </CardBody>
        </div>
        </Card>
        
      </CardColumns>

    </div>
    )
  }
}


export default Profile;
