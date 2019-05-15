import React from 'react';
import { Card, CardImg, CardTitle, CardText, Label, CardColumns,
  CardSubtitle, CardBody,  Col, FormGroup, Input  , CustomInput,Button
   } from 'reactstrap';
import '../styles/Recipe.css';
import time from '../styles/img/time.png'
import location from '../styles/img/location.png'
import {Redirect} from "react-router-dom"
import axios from "axios";
import Delete from '../styles/img/delete.png'
import ReadMoreAndLess from 'react-read-more-less';
import  Country  from '../components/CountrySelector';
import  LoaderRecipe  from '../components/LoaderRecipe';

  
export default class Navbars extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      recipes:[],
      hour:"",
      countrys:"",
      sec:"",
      status:"",
      order:"",
      loaderRecipe: true
    }
  }

  componentWillMount(){
    if(!localStorage.JWT) return (<Redirect to='/Account'/>)
    axios({
      url: `https://foody-recipe.herokuapp.com/api/v1/favorite/show`,
      method:"get",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
      }
    })
    .then((response)=> {   
      this.setState({
        recipes:response.data.recipe,
        loaderRecipe: false
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }  


  deleteFromFavorite=(owner)=>{
    const data ={
      id_owner: owner
    }
  
    axios({
      url: `https://foody-recipe.herokuapp.com/api/v1/favorite/delete`,
      method:"post",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
        // Accept: 'multipart/form-data'
      },
      data: data
    })
    .then((response)=> {
      this.setState({
        recipes:response.data.recipes
      })
      
    
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  searchApiCall = data => {
    axios({
      url: `https://foody-recipe.herokuapp.com/api/v1/favorite/search`,
      method:"get",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
      },
      params: {
        ...data
      }
    })
    .then((response)=> {
      this.setState({
        recipes:response.data.recipe,
        status: response.data.status
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    if(!localStorage.JWT){
      axios({
        url: `https://foody-recipe.herokuapp.com/api/v1/recipe/search/all`,
        method:"get",          
        headers: {
          // "Authorization": "Bearer " + localStorage.getItem("JWT"),
        },
        params: {
          ...data
        }
      })
      .then((response)=> {
        this.setState({
          recipes:response.data.recipe,
          status: response.data.status
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }
  
  selectCountry =(country)=>{
    const { hour, sec, order } = this.state
    this.setState({
      countrys:country
    })
    const data = {
      hour,
      sec,
      order,
      country
    }
    this.searchApiCall(data)
  }
  
  
  handleEdit=(e)=>{
    const dataChange = {
      [e.target.name]:e.target.value
    }

    this.setState(dataChange)

    const data = {
      hour: this.state.hour, 
      sec:this.state.sec, 
      country: this.state.countrys,
      order: this.state.order,
      ...dataChange 
    }
  
    this.searchApiCall(data)
  }
  
  handleOrder=(e)=>{
    const dataChange = {
      order:e.target.value
    }
  
    this.setState(dataChange)

    const data = {
      hour: this.state.hour, 
      sec:this.state.sec, 
      country: this.state.countrys,
      order: this.state.order,
      ...dataChange 
    }
    this.searchApiCall(data)
  }
  
  refresh =() => window.location.reload()

  render() {
    if(!localStorage.JWT) return (<Redirect to='/Account'/>)
    return (
      <div className="topSpace">
      {this.state.loaderRecipe? <LoaderRecipe/>:
        <>

        <div>
          <div className="profilePage">
            <div className="row">
              <div className="col-md-3"> 
                <Col md={12} >
                    <Label for="exampleSelect" className="topSearch">Order recipe</Label>
                    <FormGroup>
                      <CustomInput onChange={this.handleOrder} type="select" id="exampleCustomSelect" name="customSelect">
                        <option value="">Random</option>
                        <option>Recently</option>
                        <option>Time to prepare</option>
                      </CustomInput>
                    </FormGroup>
                  </Col>
              </div>

              <div className="borderLeft col-md-4 ">
                <Col md={12} >
                  <Label for="exampleSelect" className="topSearch">Select country</Label>
                  <Country name="country" selectCountry={this.selectCountry} />
                </Col>
              </div> 

              <div className="borderLeft col-md-5 ">
                <Label for="exampleSelect" className="topSearch">Max prepare time</Label>
                  <Col md={12}  className="searchItem">
                    <Col md={6}>
                      <FormGroup  className="searchItem">
                        <Label className="searchSize topSearch" for="exampleTime">Hours:</Label>
                        <Input
                            type="number"
                            name="hour"
                            onChange={this.handleEdit}
                            id="exampleTime"
                            placeholder="0"
                            min="0" max="9"
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup  className="searchItem">
                        <Label  className="searchSize topSearch" for="exampleTime">Minutes: </Label>
                        <Input
                          type="number"
                          name="sec"
                          onChange={this.handleEdit}
                          id="exampleTime"
                          placeholder="00"
                          min="10" max="59"
                        />
                      </FormGroup>
                    </Col>
                  </Col>
                </div>   
              </div>           
            </div>
          </div>


        {this.state.status === "no recipe"?
          <div className="notFound"> 
            <h1 >Oops! No results found.</h1><br/>
            <h5>try to entering different information again. Or click on button to refresh.</h5>
            <Button className="mt-3" onClick={this.refresh} color="success">Refresh Filter</Button>  
          </div>
          :""
        }

        <div className="numRecipe"> 
          <p className="mb-0">
            You have <span className="topSearch">{this.state.recipes.length}</span> Recipes
          </p>
        </div>


        <CardColumns className="cardStyle mt-0">
    
          { this.state.recipes.map(recipe => {
              return (
                <Card  className="bigCard" key={recipe.id}>
                  <div className="warpCard">
                    <div className="colors">
                      {/* user info */}
                      <div className="row">
                        <div className=" user">
                          <div className="userImg">
                            <CardImg top  className="userImgtwo" src={recipe.user_photo} alt="Card image cap" />
                          </div>
                          <div className="userText">
                            <a className="userId" href={`/Profile/${recipe.id_owner}`}>
                              <CardSubtitle className="usernamePost">{recipe.username}</CardSubtitle>
                            </a>
                            <CardText className="timePost">
                              {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(recipe.time)}
                            </CardText>
                          </div>
                        </div>
                      </div>
                      
                      <CardImg top width="100%" className="recipeImg" src={recipe.photo} alt="Card image cap" />

                      <CardTitle className="info"> 
                        <img className="icon" src={time} alt="time icon"/> 
                          0{recipe.hour}:{recipe.sec}   
                        <img className="icon iconSpace"  src={location} alt="location icon" /> 
                          {recipe.countrys}
                      </CardTitle>

                      <div className="row">
                        <p className="cir" onClick={()=>{this.deleteFromFavorite(recipe.id_owner)}} >
                          <img src={Delete} height="30px" alt="icon delete"/>
                        </p>
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
      </div>
    )
  }
}