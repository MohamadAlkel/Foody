import React from 'react'
import '../styles/signup.css';
import { Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody,Button, Form, FormGroup , Label, Input} from 'reactstrap';
import {Redirect} from "react-router-dom"

  import axios from "axios";



  const validateEmail = email => {
    return /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)
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
        this.setState({ 
          validatedP,
          validated
        })

        if (!email || !password || !cpassword || !username) {
          alert('Your fields are empty')
        } else if (validatedP && validated) {
          alert(`A email was submitted:  ${email}
          ${password}
          ${cpassword} !=
          ${username}
          ` )
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
        const {showWhat, validated, validatedP,login} = this.state
        if (login === true){return <Redirect to='/Profile'/>}
       

      return (
        <>
        <h1 className="signupHead"> SIGN UP</h1>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">Username</Label>
            <Input type="email" name="username" id="exampleEmail" onChange={this.handleChange} placeholder="with a placeholder" />
          </FormGroup>  
          <FormGroup>
            <Label for="exampleEmail">Email address</Label>
            <Input type="email" name="email" id="exampleEmail" onChange={this.handleChange} placeholder="with a placeholder" />
            <p className="textRed" >
                {!validated?`Please enter valid email.`:``}
            </p>
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword"> password</Label>
            <Input type="password" name="password" id="examplePassword" onChange={this.handleChange} placeholder="password placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Confirm password</Label>
            <Input type="password" name="cpassword" id="examplePassword" onChange={this.handleChange} placeholder="password placeholder" />
            <p className="textRed" >
                {!validatedP?`Please enter same password.`:`` }
            </p>
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

