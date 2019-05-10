import React, { Component } from 'react';

  import pro from '../styles/img/pro.jpg'
import '../styles/Recipe.css';
import time from '../styles/img/time.png'
import location from '../styles/img/location.png'
import { Card, CardImg, CardTitle, CardText, Label, CardColumns,
  CardSubtitle, CardBody,  Col, FormGroup, Input  , CustomInput
   } from 'reactstrap';
import axios from "axios";
import Add from '../styles/img/add.png'
import  Country  from '../components/CountrySelector';
import  InputRange  from '../components/inputRange';
import '../styles/Portfolio.css';
import ReadMoreAndLess from 'react-read-more-less';






class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state={
      recipes:[],
      countrys:"",
      rSelected:[],
      hour:"",
      sec:""
    }
  }
  


  componentWillMount(){
    axios({
      url: `http://localhost:5000/api/v1/recipe/show/for/all`,
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

    if(!localStorage.JWT){
      axios({
        url: `http://localhost:5000/api/v1/recipe/show/all`,
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
  }

  onRadioBtnClick = (rSelected)=> {
    this.setState({ rSelected });
  }


  addToFavorite=(owner)=>{
    // debugger
    // e.preventDefault();
    const data ={
      id_owner: owner
    }

    axios({
      url: `http://localhost:5000/api/v1/favorite/new`,
      method:"post",          
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("JWT"),
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

  selectCountry =(country)=>{
    // debugger
    this.setState({
      countrys:country
    })
  }


  handleEdit=(e)=>{
    debugger
    // this.setState({
    //   [e.target.name]:e.target.value
    // })

    let hour = e.target.value
    let sec = e.target.value

    const data ={
      hour: e.target.value,
      sec:e.target.value,
      country: this.state.countrys
    }
    
    axios({
      url: `http://localhost:5000/api/v1/recipe/search`,
      method:"post",          
      headers: {
        // "Authorization": "Bearer " + localStorage.getItem("JWT"),
      },
      data: data
    })
    .then((response)=> {
      this.setState({recipes:response.data.recipe})
      
    
    })
    .catch(function (error) {
      console.log(error);
    });


  }








  render() {
    console.log(this.state.countrys)
    return (
    <div className="topSpace">

      <div>
        <div className="profilePage">
          <div className="row">
            <div className="col-md-2"> 
            <Col md={12} >
                <Label for="exampleSelect" className="topSearch">Show recipe</Label>
                <FormGroup>
                  <CustomInput type="select" id="exampleCustomSelect" name="customSelect">
                    <option value="">Random</option>
                    <option>Recently</option>
                    
                  </CustomInput>
                </FormGroup>
              </Col>
               
            </div>

            <div className="borderLeft col-md-5 ">
              <Col md={12} >
                <Label for="exampleSelect" className="topSearch">Select country</Label>
                  <Country name="country" selectCountry={this.selectCountry}  />
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
                <CardTitle className="info"> <img className="icon" src={time} /> 0{recipe.hour}:{recipe.sec}   <img className="icon iconSpace" src={location} /> {recipe.countrys}</CardTitle>

                <div className="row">
                  <a className="cir" onClick={()=>{this.addToFavorite( recipe.id_owner)}}  ><img src={Add} height="30px"/></a>
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


export default Recipe;
