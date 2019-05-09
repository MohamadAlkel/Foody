import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody,  Button,   
     } from 'reactstrap';
import '../styles/Recipe.css';
import '../styles/Portfolio.css';
import pro from '../styles/img/pro.jpg'
import time from '../styles/img/time.png'
import location from '../styles/img/location.png'
import userImg from '../styles/img/userImg.jpg'
import  AddNew  from '../containers/AddNew';
import  EditProfile  from '../containers/EditProfile';
import  SignupLogin  from './SignupLogin';
import {Redirect} from "react-router-dom"
import axios from "axios";
import Moment from 'react-moment';
import 'moment-timezone';
// Moment.globalFormat = 'l   HH:mm ';
import ReadMoreAndLess from 'react-read-more-less';






class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:"",
      work:"",
      brief:"",
      photo:"https://storage.googleapis.com/foodymhd/userImg.jpg",
      recipes:[],
      following: "",
      followers: "",
      recipesNum: ""
    }
  }


  
  componentWillMount(){
    // to see profile page
    axios({
      url: `http://localhost:5000/api/v1/users/show`,
      method:"get",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
        // Accept: 'multipart/form-data'
      }
      // data: formData
    })
    .then((response)=> {
      
      // console.log("resulrt "+ localStorage.JWT)
      this.setState({
        username:response.data.user.username,
        work:response.data.user.work,
        brief:response.data.user.brief,
        photo:response.data.user.photo
      })
    
    })
    .catch(function (error) {
      console.log(error);
    });  
    


    // debugger
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



    
    axios({
      url: `http://localhost:5000/api/v1/recipe/number`,
      method:"get",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
      }
 
    })
    .then((response)=> {
       this.setState({
        following: response.data.number.following,
        followers: response.data.number.followers,
        recipesNum: response.data.number.recipes
       })
    })
    .catch(function (error) {
      console.log(error);
    });  


  }




  deleteRecipe=(id)=>{
    // debugger
    // e.preventDefault();
    const data ={
      recipe_id: id,
    }

    axios({
      url: `http://localhost:5000/api/v1/recipe/delete`,
      method:"post",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
        // Accept: 'multipart/form-data'
      },
      data: data
    })
    .then((response)=> {
      window.location.reload()
      
    //  let items = [...this.state.items]
    //  items.push(response.data.user)
    //  this.setState({items:items})
    //  this.setState({showAddItemModel:false})
    //  this.setState({file_name: response.data.user.file_name})
    })
    .catch(function (error) {
      console.log(error);
    });

  }  


  render() {
    const {username,work, brief, photo, recipesNum, followers, following}=this.state
    console.log("looooo " + this.state.recipes)
    let props={
      username,
      work,
      brief,
      photo
    }
    // const moment = require('moment');

    // {moment(newMessage.timestamp).format('LT')}
    // {moment(recipe.time).format('LT')}
    
    if(!localStorage.JWT) return (<Redirect to='/Account'/>)
    const dateToFormat = new Date('12:59');
    
  return (
    <div>
      <div className="profilePage">
        <div className="row">
          <div className="col-md-3">
              
                <div className="userPhoto">
                    <img height="100%" src={photo}/>
                </div>
                <p className="username">{username}</p>
                <p className="job">{work}</p>
                <div color="success"><EditProfile {...props}  update={this.update}/></div>
               
          </div>

          <div className="borderLeft col-md-9">
            <div className="brief">

              <div className="row userInfo">
                <div className="col-sm-4 oneInfo">
                    <p className="numInfo">{following}</p>
                    <p className="aboutInfo">Following</p>
                </div>
                <div className=" col-sm-4 oneInfo">
                    <p className="numInfo">{followers}</p>
                    <p className="aboutInfo">Followers</p>
                </div>
                <div className=" col-sm-4 oneInfo">
                    <p className="numInfo">{recipesNum}</p>
                    <p className="aboutInfo">Recipes</p>
                </div>
              </div>

              <p className="topGreen">_ Brief</p>
              <h6 className="textBrief">{brief}</h6>
              <div className="btnUser" color="success"><AddNew /></div>
              
            </div>
          </div>           
        </div>
      </div>

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
                      <CardText className="timePost">
                         {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(recipe.time)}
                      </CardText>
                      <Button className="x" close  onClick={()=>{this.deleteRecipe(recipe.id)}}/>
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
                  {/* <CardText className="textGreen">{recipe.directions}</CardText> */}
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
