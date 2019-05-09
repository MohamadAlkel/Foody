import React from 'react'
import '../styles/signup.css';
import { Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody,Button, Form, FormGroup , Label, Input} from 'reactstrap';
import {Redirect} from "react-router-dom"

  import axios from "axios";



  const validateEmail = email => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
  }

  const validateUsername = username => {
    return /^(?=.{4,20}$)[a-zA-Z0-9._]/.test(username)
  }

  const validatePassword = password => {
    return /^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$/.test(password)
  }


  
  export default class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          username:"",
          email:"",
          password:"",
          cpassword:"",
          validatedP:true,
          validated:true,
          emptyEmail:true,
          emptyUsername:true,
          emptyPassword:true,
          validateName:true,
          validatePass:true,
          login: false
        }
      }

      handleChange = e => {
        this.setState({
          [e.target.name]: e.target.value
        })
      } 

      showForm=()=>{
          this.setState({showWhat:!this.state.showWhat})
      }

      handleSignup=(e)=>{
        e.preventDefault()
        const { email, password, cpassword, username } = this.state
        
        const validatedP = password === cpassword && password && cpassword
        const validated = validateEmail(email) && password && email
        const emptyEmail = email 
        const emptyPassword = password
        const emptyUsername = username
        const validateName = validateUsername(username)
        const validatePass = validatePassword(password)

        this.setState({ 
          validatedP,
          validated,
          validateName,
          emptyEmail,
          emptyPassword,
          emptyUsername,
          validatePass
        })

        if (validatedP && validated && emptyEmail && emptyPassword && emptyUsername) {
          // send Api
          const data ={
          username,
          email,
          password
        }
        // debugger
        axios.post(`http://localhost:5000/api/v1/users/newuser`, data)
        .then((response) => {
          console.log(response)
          localStorage.setItem('username', response.data.user.username)
          localStorage.setItem('user_id', response.data.user.id)
          localStorage.setItem('JWT', response.data.access_token)
          
          this.setState({login:true})
          
        })
        .catch(function (error) {
          console.log(error);
        });
        
       }

      }

    render() {
        const {emptyEmail, emptyPassword, emptyUsername, validated, validatedP,login, validateName, validatePass} = this.state
        if (login === true){return <Redirect to='/Profile'/>}
       

      return (
        <>
        <h1 className="signupHead"> SIGN UP</h1>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <Input type="username" name="username" id="exampleEmail" onChange={this.handleChange} placeholder="with a placeholder" />
            <div className="textRed ml-2 mt-1" >
                {!validateName?`- Oops! characters long least 4-20`:``}
            </div>
            <div className="textRed ml-2" >
                {!emptyUsername?`- Your field is empty`:``}
            </div>
          </FormGroup>  
          <FormGroup>
            <Label for="exampleEmail">Email address</Label>
            <Input type="email" name="email" id="exampleEmail" onChange={this.handleChange} placeholder="with a placeholder" />
            <div className="textRed ml-2 mt-1" >
                {!validated?`- Please enter valid email.`:``}
            </div>
            <div className="textRed ml-2" >
                {!emptyEmail?`- Your field is empty`:``}
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword"> password</Label>
            <Input type="password" name="password" id="examplePassword" onChange={this.handleChange} placeholder="password placeholder" />
            <div className="textRed ml-2 mt-1" >
                {!validatePass?`- password must be at least 6 characters & 1 letter & 1 number.`:``}
            </div>
            <div className="textRed ml-2" >
                {!emptyPassword?`- Your field is empty`:``}
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Confirm password</Label>
            <Input type="password" name="cpassword" id="examplePassword" onChange={this.handleChange} placeholder="password placeholder" />
            <div className="textRed ml-2 mt-1" >
                {!validatedP?`- Please enter same password`:``}
            </div>
          </FormGroup>
          <div className="warpBtn">  
            <Button className="btnLight" onClick={this.handleSignup} >Sign up</Button>
            <Button className="btnLight" onClick={this.props.showForm} >Go to Log in</Button>
          </div>
        </Form>
  
    </>
      )
    }
  }

