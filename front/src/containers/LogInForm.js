import React,{Component} from 'react'
import '../styles/signup.css';
import { Button, Form, FormGroup , Label, Input} from 'reactstrap';
import axios from "axios";
import {Redirect} from "react-router-dom"



export default class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state={
      email:"",
      password:"",
      emptyEmail:true,
      emptyPassword:true,
      login:false,
      PasswordIncorrect:false,
      noEmail:false
    }
  }

  handleLogin=e=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  handleSubmit= (e)=> {
    e.preventDefault()
      const { email, password} = this.state

      const emptyEmail = email 
      const emptyPassword = password

      this.setState({ 
        emptyEmail,
        emptyPassword,
      })

      if (emptyEmail && emptyPassword ) {

        const data ={
          email: email,
          password:password,
        }

        axios.post(`http://localhost:5000/api/v1/users/login`, data)
        .then((response)=> {
          
          if(response.data.msg === "bad Login"){ 
            this.setState({
              noEmail: true,
              PasswordIncorrect: false
            })
          }else if (response.data.msg === "no password"){
            this.setState({
              PasswordIncorrect: true,
              noEmail: false,
            })
          }else {
            localStorage.setItem('username', response.data.user.username)
            localStorage.setItem('work', response.data.user.work)
            localStorage.setItem('photo', response.data.user.photo)
            localStorage.setItem('id', response.data.user.id)
            localStorage.setItem('brief', response.data.user.brief)
            localStorage.setItem('JWT', response.data.access_token)
            this.setState({login:true})
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }

  render() {
    const {emptyEmail, emptyPassword, PasswordIncorrect,noEmail} = this.state
    if (this.state.login === true){return <Redirect to={`/Profile/${localStorage.id}`}/>}
      return (
        <>
          <h1 className="signupHead"> LOG IN</h1>
          <Form >
            <FormGroup>
              <Label for="exampleEmail">Email address</Label>
              <Input type="email" name="email" autoComplete="email" onChange={this.handleLogin} id="exampleEmail" placeholder="with a placeholder" />
              <div className="textRed ml-2 mt-1" >
                  {noEmail?`- This email is not exist.`:``}
              </div>
              <div className="textRed ml-2" >
                  {!emptyEmail?`- Your field is empty`:``}
              </div>
            </FormGroup>
            
            <FormGroup>
              <Label for="examplePassword"> password</Label>
              <Input type="password" autoComplete="current-password" name="password" onChange={this.handleLogin} id="examplePassword" placeholder="password placeholder" />
              <div className="textRed ml-2 mt-1" >
                  {PasswordIncorrect?`- Your password is incorrect.`:``}
              </div>
              <div className="textRed ml-2" >
                  {!emptyPassword?`- Your field is empty`:``}
              </div>
            </FormGroup>

            <div className="warpBtn">  
              <Button className="btnLight" onClick={this.handleSubmit} >Log in</Button>
              <Button className="btnLight" onClick={this.props.showForm}>Go to Sign up</Button>
            </div>
      
          </Form>
        </>
      );
  }
}
  
  
