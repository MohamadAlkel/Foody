import React from 'react';
import '../styles/Recipe.css';
import '../styles/signup.css';
import  SignUpForm  from '../containers/SignUpForm';
import  LogInForm  from '../containers/LogInForm';

  
export default class SignupLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      showWhat:true
    }
  }

  showForm=()=>{
    this.setState({showWhat:!this.state.showWhat})
  }

  render() {
    const {showWhat} = this.state
    return (
        <>
          <div className="backOne "></div>
          <div className="back "></div>
          <div className="row"> 
            <div className="col-md-6 topSpace">
                <h1 className="leftSignWelcome ">Welcome!</h1>
                <h1 className="leftSign ">find the best dish from everywhere.</h1>
                <h1 className="leftSignTwo">test different dishes<br/>from everywhere<br/>on this app</h1>
            </div>
            <div className="col-md-6 topSpace ">
              <div className="warpForm">
                  {showWhat?<SignUpForm showForm={this.showForm}/>:<LogInForm showForm={this.showForm}/>}    
              </div>   
            </div>
          </div>
        </>
      )
    }
}