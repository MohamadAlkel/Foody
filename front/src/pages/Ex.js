import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody } from 'reactstrap';
  import pro from '../styles/img/pro.jpg'
import '../styles/Recipe.css';
import time from '../styles/img/time.png'
import location from '../styles/img/location.png'
import {Redirect} from "react-router-dom"
import axios from "axios";
import Delete from '../styles/img/delete.png'
import ReadMoreAndLess from 'react-read-more-less';



  
  
  export default class Navbars extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        recipes:[]
      }
    }

    componentWillMount(){
      axios({
        url: `http://localhost:5000/api/v1/favorite/show`,
        method:"get",          
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("JWT"),
        }
   
      })
      .then((response)=> {
  
       
        this.setState({recipes:response.data.recipe})
      })
      .catch(function (error) {
        console.log(error);
      });
    }  


    deleteFromFavorite=(owner)=>{
      // debugger
      // e.preventDefault();
      const data ={
        id_owner: owner
      }
  
      axios({
        url: `http://localhost:5000/api/v1/favorite/delete`,
        method:"post",          
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("JWT"),
          // Accept: 'multipart/form-data'
        },
        data: data
      })
      .then((response)=> {
        window.location.reload()
        
      
      })
      .catch(function (error) {
        console.log(error);
      });
  
    }



    render() {
      if(!localStorage.JWT) return (<Redirect to='/Account'/>)

      return (
      <div className="topSpace">

      <div>
        <div className="profilePage">
          <div className="row">
            <div className="col-md-3"> 
               
            </div>

            <div className="borderLeft col-md-9">

            </div>  
          
          </div>           
        </div>
      </div>


        <CardColumns className="cardStyle">
  
        {
        this.state.recipes.map(recipe => {
          return (
            <Card  className="bigCard" key={recipe.id}>
            <div className="warpCard">
              <div className="colors">
                <div className="row">
                  <div className=" user">
                    <div className="userImg">
                      <CardImg top  className="userImgtwo" src={recipe.user_photo} alt="Card image cap" />
                    </div>
                    <div className="userText">
                      <CardSubtitle className="usernamePost">{recipe.username}</CardSubtitle>
                      <CardText className="timePost">
                         {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(recipe.time)}
                      </CardText>
                    </div>
                  </div>
                </div>
                
                <CardImg top width="100%" className="recipeImg" src={recipe.photo} alt="Card image cap" />
                <CardTitle className="info"> <img className="icon" src={time} /> 0{recipe.hour}:{recipe.sec}   <img className="icon iconSpace"  src={location} /> {recipe.countrys}</CardTitle>

                <div className="row">
                  <a className="cir" onClick={()=>{this.deleteFromFavorite( recipe.id_owner)}}  ><img src={Delete} height="30px"/></a>
                  <CardTitle className="recipeHead">{recipe.name}</CardTitle>
                </div>
              </div>  
              
              <CardBody className="colorsTwo">
                <div className="insideGreen">
                  <CardTitle className="headGreen">_ Ingredients</CardTitle>
                  <CardText className="textGreen">{recipe.ingredients}</CardText>
                  <CardTitle className="headGreen">_ Directions</CardTitle>
                  <div className="read">
                    <ReadMoreAndLess
                        ref={this.ReadMore}
                        className="read-more-content read"
                        style="color: rgb(0, 0, 0)"
                        charLimit={150}
                        readMoreText="Read more"
                        readLessText="Read less"
                    >
                        {recipe.directions}
                    </ReadMoreAndLess>
                  </div> 
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