import React, { Component } from 'react';
import { Card, CardImg, CardTitle, CardText, CardColumns,
    CardSubtitle, CardBody,  Button,   
     } from 'reactstrap';
import '../styles/Recipe.css';
import '../styles/Portfolio.css';
import time from '../styles/img/time.png'
import location from '../styles/img/location.png'
import  AddNew  from '../containers/AddNew';
import  EditProfile  from '../containers/EditProfile';
import {Redirect} from "react-router-dom"
import axios from "axios";
import 'moment-timezone';
import ReadMoreAndLess from 'react-read-more-less';
import Def from '../styles/img/def.png'
import  LoaderProfile  from '../components/LoaderProfile';



export default class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state={
      username:"",
      work:"",
      brief:"",
      photo:"https://storage.googleapis.com/foody-project/userImg.jpg",
      recipes:[],
      following: "",
      followers: "",
      recipesNum: "",
      here:"",
      loaderProfile: true
    }
  }

    componentDidUpdate(props) {
      if (this.props.match.params.id !== props.match.params.id) {
        this.showPage()
      }
    }
  
  componentWillMount(){
    if(!localStorage.JWT) return (<Redirect to='/Account'/>)
    this.showPage()
  }


  showPage =()=>{
    // to see profile page
    axios({
      url: `http://localhost:5000/api/v1/users/show/${this.props.match.params.id}`,
      method:"get"         
    })
    .then((response)=> {
      this.setState({
        username:response.data.user.username,
        work:response.data.user.work,
        brief:response.data.user.brief,
        photo:response.data.user.photo,
        here:response.data.user.here,
        
      })
    })
    .catch(function (error) {
      console.log(error);
    });  
    
    axios({
      url: `http://localhost:5000/api/v1/recipe/show/${this.props.match.params.id}`,
      method:"get",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
      }
    })
    .then((response)=> {
      this.setState({
        recipes:response.data.recipe,
        loaderProfile: false
      })
    })
    .catch(function (error) {
      console.log(error);
    }); 
    
    axios({
      url: `http://localhost:5000/api/v1/recipe/number/${this.props.match.params.id}`,
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
    const data ={
      recipe_id: id,
    }

    axios({
      url: `http://localhost:5000/api/v1/recipe/delete`,
      method:"post",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
      },
      data: data
    })
    .then((response)=> {
      const {recipes, recipesNum}= response.data
      this.setState({
        recipesNum,
        recipes
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }  

  editProfile =(username, work, brief, photo)=>{
    this.setState({
      username,
      work,
      brief,
      photo
    })
  }

  addRecipe =(recipesNum, recipes)=>{
    this.setState({
      recipesNum,
      recipes
    })
  }

  openMore =()=>{

  }


  render() {
    const {username,work, brief, photo, recipesNum, followers, following}=this.state
    let props={
      username,
      work,
      brief,
      photo
    }
    if(!localStorage.JWT) return (<Redirect to='/Account'/>)
    if(this.state.here === "no") return (<Redirect to='/no_user'/>)
  return (
    <>
     {this.state.loaderProfile? <LoaderProfile/>:
      <>
     
      <div className="profilePage">

        <div className="row">
          <div className="col-md-3">
            <div className="userPhoto">
                <img height="100%" src={photo} alt="user img"/>
            </div>
            <p className="username">{username}</p>
            <p className="job">{work}</p>

            {(this.props.match.params.id===localStorage.id)?
              <div color="success"><EditProfile {...props} editProfile={this.editProfile}  update={this.update}/></div>
              :""
            }
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
              {(this.props.match.params.id===localStorage.id)?
                <div className="btnUser" color="success"><AddNew addRecipe={this.addRecipe} /></div>
                :""
              }
            </div>
          </div>           
        </div>
      </div>

      
      
      <CardColumns  className="cardStyle mt-0">

        { this.state.recipes.map(recipe => {
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
                          <a className="userId" href={`/Profile/${recipe.user_id}`}>
                            <CardSubtitle className="usernamePost">{recipe.username}</CardSubtitle>
                          </a>
                          <CardText className="timePost">
                            {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(recipe.time)}
                          </CardText>
                        </div>
                        {(this.props.match.params.id===localStorage.id)?
                            <Button className="x " close  onClick={()=>{this.deleteRecipe(recipe.id)}}/>
                            :""
                          }
                      </div>
                    </div>
                  
                    <CardImg top width="100%" className="recipeImg" src={recipe.photo} alt="Card image cap" />
                    <CardTitle className="info">
                      <img className="icon" src={time} alt="time icon" />
                        0{recipe.hour}:{recipe.sec}   
                      <img className="icon iconSpace" src={location} alt="location icon" /> 
                        {recipe.countrys}
                    </CardTitle>

                    <div className="row">
                      {localStorage.JWT?
                        <p className="cir" onClick={()=>{this.addToFavorite( recipe.id_owner)}}  >
                          <img src={Def} height="30px" alt="icon follow"/>
                        </p>
                        :<a className="cir"  href='/Account' >
                          <img src={Def} height="30px" alt="icon follow"/>
                        </a>
                      }
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
      </>
     }
    </>
    )
  }
}


 
