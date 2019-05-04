import React,{Component} from 'react'
import '../styles/signup.css';
import { Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody,Button, Form, FormGroup , Label, Input} from 'reactstrap';
import axios from "axios";
import {Redirect} from "react-router-dom"



  class LogInForm extends Component {
    constructor(props) {
      super(props);
      this.state={
        email:"",
        password:"",
        login:false
      }
  
    }

    handleLogin=e=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    handleSubmit= (e)=> {
      e.preventDefault()
        const { email, password } = this.state
        
        // const validatedP = password === cpassword && password && cpassword
        // const validated = validateEmail(email) && password && email
        // this.setState({ 
        //   validatedP,
        //   validated
        // })

        if (!email || !password ) {
          alert('Your fields are empty')
        } else  {
          alert(`A email was submitted:  ${email}
          ${password}
          ` )

          const data ={
            email: this.state.email,
            password:this.state.password,
          }

          axios.post(`http://localhost:5000/api/v1/users/login`, data)
          .then((response)=> {
            // console.log(response.data)
            localStorage.setItem('username', response.data.user.username)
            localStorage.setItem('work', response.data.user.work)
            localStorage.setItem('photo', response.data.user.photo)
            localStorage.setItem('id', response.data.user.id)
            localStorage.setItem('brief', response.data.user.brief)
            localStorage.setItem('JWT', response.data.access_token)
            this.setState({login:true})
            
          })
          .catch(function (error) {
            console.log(error);
          });

        }

    
    
    
      }



    render() {
      if (this.state.login === true){return <Redirect to='/Profile'/>}
      // console.log(this.state.password)
      return (
        <>
      
        <h1 className="signupHead"> LOG IN</h1>
        <Form>
          
          <FormGroup>
            <Label for="exampleEmail">Email address</Label>
            <Input type="email" name="email" onChange={this.handleLogin} id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword"> password</Label>
            <Input type="password" name="password" onChange={this.handleLogin} id="examplePassword" placeholder="password placeholder" />
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
  
  export default LogInForm;
