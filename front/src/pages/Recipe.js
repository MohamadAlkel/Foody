import React, { Component } from 'react';

  import pro from '../styles/img/pro.jpg'
import '../styles/Recipe.css';
import time from '../styles/img/time.png'
import location from '../styles/img/location.png'
import { Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody,  Button,   
   } from 'reactstrap';
import axios from "axios";



class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state={
      recipes:[]
    }
  }
  


  componentWillMount(){
    axios({
      url: `http://localhost:5000/api/v1/recipe/show`,
      method:"get",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
      }
 
    })
    .then((response)=> {

      console.log("resulrt "+ response.data.recipe)
      console.log("nooooooo" + response.data.recipes)
      this.setState({recipes:response.data.recipe})
    })
    .catch(function (error) {
      console.log(error);
    });  
    
   
  }





  render() {
    return (
    <div className="topSpace">
      <CardColumns className="cardStyle">

      {
        this.state.recipes.map(recipe => {
          return (
            <Card key={recipe.id}>
            <div className="warpCard">
              <div className="colors">
                <div className="row">
                  <div className=" user">
                    <div className="userImg">
                      <CardImg top  className="userImgtwo" src={recipe.user_photo} alt="Card image cap" />
                    </div>
                    <div className="userText">
                      <CardSubtitle className="usernamePost">{recipe.username}</CardSubtitle>
                      <CardText className="timePost">{recipe.time}</CardText>
                      <Button className="x" close />
                    </div>
                  </div>
                </div>
                
                <CardImg top width="100%" className="recipeImg" src={recipe.photo} alt="Card image cap" />
                <CardTitle className="info"> <img className="icon" src={time} /> 0{recipe.hour}:{recipe.sec}   <img className="icon" src={location} /> {recipe.countrys}</CardTitle>

                <div className="row">
                  <a className="cir" href="#" target="_blank">❤</a>
                  <CardTitle className="recipeHead">{recipe.name}</CardTitle>
                </div>
              </div>  
              
              <CardBody className="colorsTwo">
                <div className="insideGreen">
                  <CardTitle className="headGreen">_ Ingredients</CardTitle>
                  <CardText className="textGreen">{recipe.ingredients}</CardText>
                  <CardTitle className="headGreen">_ Directions</CardTitle>
                  <CardText className="textGreen">{recipe.directions}</CardText>
                </div>
              </CardBody>
            </div>
          </Card>
          )
        })
      }

       
        
      </CardColumns>
    </div>
    )
  }
}


export default Recipe;
