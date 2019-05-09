import React from 'react';
import { Form, FormGroup, Label, Input, Col, FormText , Row,  ModalBody, ModalFooter,Button,ModalHeader,Modal} from 'reactstrap';
import '../styles/Portfolio.css';
import  Country  from './CountrySelector';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";


import Moment from 'react-moment';
import 'moment-timezone';
Moment.globalFormat = 'L  HH:mm a';




const nameValidate = name => {
  return /^(?=.{4,12}$)/.test(name)
}

const ingredientsValidate = ingredients => {
  return /^(?=.{50,}$)/.test(ingredients)
}

const directionsValidate = directions => {
  return /^(?=.{50,}$)/.test(directions)
}


class FormRecipe extends React.Component {
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
    // debugger
    this.setState({
      [e.target.name]:e.target.value
    })
  }


  selectCountry =(country)=>{
    // debugger
    this.setState({
      countrys:country
    })
  }



  submitHandler = (e) => {
    // debugger

    // alert('Success');
        e.preventDefault();
        let formData = new FormData() // instantiate it
      
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
          validateName,
       
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
  
          this.props.toggle()
        }
        
        // axios({
        //   url: `http://localhost:5000/api/v1/recipe/new`,
        //   method:"post",          
        //   headers: {
        //     "Authorization": "Bearer " + localStorage.getItem("JWT"),
        //     Accept: 'multipart/form-data'
        //   },
        //   data: formData
        // })
        // .then((response)=> {
        //   window.location.reload()
          
        // //  let items = [...this.state.items]
        // //  items.push(response.data.user)
        // //  this.setState({items:items})
        // //  this.setState({showAddItemModel:false})
        // //  this.setState({file_name: response.data.user.file_name})
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });

        // this.props.toggle()    
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
          <Label for="exampleText">_Ingredients</Label>
          <Input type="textarea" name="ingredients" onChange={this.handleEdit} id="exampleText" />
          <div className="textRed ml-2 mt-1" >
                {!validateIngredent?`- Oops! characters at least 50`:``}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">_Directions</Label>
          <Input type="textarea" name="directions" onChange={this.handleEdit} id="exampleText" />
          <div className="textRed ml-2 mt-1" >
                {!validateDir?`- Oops! characters at least 50`:``}
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

           <Label  className="size" for="exampleTime">Seconds</Label>
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

            <Country name="country" selectCountry={this.selectCountry}  />
        </Col>

        {/* <Col md={12}>
          <CountryDropdown
            value={f}
            onChange={(value) => this.selectCountry(value)} />

        </Col> */}
      
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
            <Button color="success" onClick={this.submitHandler} >Add</Button>{' '}
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

export default FormRecipe  