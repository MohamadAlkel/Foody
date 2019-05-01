import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody } from 'reactstrap';
  import pro from '../styles/img/pro.jpg'
import '../styles/Recipe.css';
import time from '../styles/img/time.png'
import location from '../styles/img/location.png'



class Recipe extends Component {
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


export default Recipe;
