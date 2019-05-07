import React from 'react';
import { Form, FormGroup, Label, Input, Col, FormText , Row,  ModalBody, ModalFooter,Button} from 'reactstrap';
import '../styles/Portfolio.css';
import  Country  from './CountrySelector';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from "axios";


import Moment from 'react-moment';
import 'moment-timezone';
Moment.globalFormat = 'L  HH:mm a';


// let f =""


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
      countrys:""    
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
        

        // console.log(formData)
        // const data ={
        //   name: this.state.name,
        //   tag_parent:this.state.tag_parent,
        //   tag_children:this.state.tag_children,
        //   description: this.state.description,
        //   image: formData
          
        // }
        const {name, fileUpload, countrys, ingredients, directions, sec, hour}=this.state

        if (!directions || !ingredients || !countrys || !fileUpload || !sec || !hour || !name ) {
          alert('Your fields are empty')
        } else  {
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




  render() {
   
    return (

  <>
  <ModalBody>
    <Form onSubmit={this.submitHandler}>
    <Row form>

        <Col md={12}>
        <FormGroup>
          <Label for="exampleEmail">_Title</Label>
          <Input name="name"  onChange={this.handleEdit}/>

        </FormGroup>
        <FormGroup>
          <Label for="exampleText">_Ingredients</Label>
          <Input type="textarea" name="ingredients" onChange={this.handleEdit} id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">_Directions</Label>
          <Input type="textarea" name="directions" onChange={this.handleEdit} id="exampleText" />
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
  </ModalBody>
  </>

    )}
  }  

export default FormRecipe  