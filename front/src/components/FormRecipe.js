import React from 'react';
import { Form, FormGroup, Label, Input, Col, FormText, Row,
  ModalBody, ModalFooter, Button, Modal} from 'reactstrap';
import '../styles/Profile.css';
import  Country  from './CountrySelector';
import axios from "axios";
import Moment from 'react-moment';
import 'moment-timezone';
Moment.globalFormat = 'L  HH:mm a';


const nameValidate = name => {
  return /^(?=.{4,12}$)/.test(name)
}

const ingredientsValidate = ingredients => {
  return /^(.{6,}|[\n|\r|\n\r])+$/.test(ingredients)
}

const directionsValidate = directions => {
  return /^(.{6,}|[\n|\r|\n\r])+$/.test(directions)
}


export default class FormRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUpload: {},
      name:"",
      directions:"",
      ingredients:"",  
      hour:"",
      sec:"",
      countrys:"",
      modal: false ,
      validateIngredent:true,
      validateName:true,
      validateDir:true  
    };
  }

  selectImage = e => {
    this.setState({fileUpload: e.target.files[0]})
  }

  handleEdit=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  selectCountry =(country)=>{
    this.setState({
      countrys:country
    })
  }

  submitHandler = (e) => {
    e.preventDefault();
    let formData = new FormData() 
  
    formData.append('photo', this.state.fileUpload, this.state.fileUpload.name)
    formData.append('name', this.state.name)
    formData.append('directions', this.state.directions)
    formData.append('ingredients', this.state.ingredients)
    formData.append('countrys', this.state.countrys)
    formData.append('hour', this.state.hour)
    formData.append('sec', this.state.sec)
    formData.append('user_id', localStorage.JWT)
    formData.append('time', Date.now())

    const {name, fileUpload, countrys, ingredients, directions, sec, hour}=this.state

    const validateName = nameValidate(name)
    const validateIngredent = ingredientsValidate(ingredients)
    const validateDir = directionsValidate(directions)

    this.setState({ 
      validateDir,
      validateIngredent,
      validateName
    })

    if (!directions || !ingredients || !countrys  || !sec || !hour || !name || !fileUpload.name) {
      this.setState({
        modal: true
      });
    } else if (validateName && validateIngredent && validateDir){
      axios({
        url: `http://localhost:5000/api/v1/recipe/new`,
        method:"post",          
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("JWT"),
          Accept: 'multipart/form-data'
        },
        data: formData
      })
      .then((response)=> {
        const {recipes, recipesNum}= response.data
        this.props.addRecipe(recipesNum, recipes)
      })
      .catch(function (error) {
        console.log(error);
      });
      this.props.toggle()
    }
  }

  toggle=()=> {
    this.setState ({
      modal: false
    });
  }

  render() {
    const {
      validateDir,
      validateIngredent,
      validateName,
    }=this.state
   
    return (
      <>
        <ModalBody>
          <Form onSubmit={this.submitHandler}>
            <Row form>

              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">_Title</Label>
                  <Input name="name"  onChange={this.handleEdit}/>
                  <div className="textRed ml-2 mt-1" >
                        {!validateName?`- Oops! characters long is 4-12`:``}
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleTextOne">_Ingredients</Label>
                  <Input type="textarea" name="ingredients" onChange={this.handleEdit} id="exampleTextOne" />
                  <div className="textRed ml-2 mt-1" >
                        {!validateIngredent?`- Oops! at least 6 characters for each line`:``}
                  </div>
                </FormGroup>

                <FormGroup>
                  <Label for="exampleTextTwo">_Directions</Label>
                  <Input type="textarea" name="directions" onChange={this.handleEdit} id="exampleTextTwo" />
                  <div className="textRed ml-2 mt-1" >
                        {!validateDir?`- Oops! at least 6 characters for each line`:``}
                  </div>
                </FormGroup>
              </Col>

              <Col md={12}>
                <Label>_Prep time</Label>
              </Col>

              <Col md={6}>
                <FormGroup >
                <Label className="size" for="exampleTime">Hours</Label>
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
                <FormGroup >
                  <Label  className="size" for="exampleTime">Minutes</Label>
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

              <Col md={12} >
                <Label for="exampleSelect" >_Select Country</Label>
                <Country name="country" selectCountry={this.selectCountry} />
              </Col>

              <Col md={12}>
                <FormGroup>
                  <Label for="exampleFile">_Images</Label>
                  <Input type="file" name="file" onChange={this.selectImage} id="exampleFile" />
                  <FormText color="muted">
                    This is some placeholder block-level.
                  </FormText>
                </FormGroup>
              </Col>
            
              <Col md={12} >
                <ModalFooter className="p-0 pt-3 ">
                  <Button color="success" onClick={this.submitHandler} >Add</Button>
                </ModalFooter>
              </Col>
              
            </Row>
          </Form>
          
            <Modal isOpen={this.state.modal} toggle={this.toggle} className="modelAlert ">
              <ModalBody >
                Your fields are empty. Please file all of them.
              </ModalBody>
              <ModalFooter>
                <Button color="success" className="m-auto"  onClick={this.toggle}>Ok I Understand</Button>
              </ModalFooter>
            </Modal>  

        </ModalBody>
      </>
    )}
  }  

 