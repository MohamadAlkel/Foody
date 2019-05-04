
import '../styles/navbar.css';
// import Logo from './styles/img/logos.png'
// import Recipe_img from './styles/img/profile.png'
// import work from './styles/img/work.png'
// import portfolio from './styles/img/portfolio.png'
// import contact from './styles/img/contact.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button
  } from 'reactstrap';
import React, { Component } from 'react';
// import './App.css';
// import  Recipe  from './pages/Recipe';
// import  Ex  from './pages/Ex';
// // import  Contact  from './pages/Contact';
// import  Portfolio  from './pages/Portfolio';
// import Notfound  from "./pages/Notfound";
// import  SignupLogin  from './pages/SignupLogin';

import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'




class Logout extends Component {

  deletJWT=()=>{
    localStorage.removeItem("JWT")
    localStorage.removeItem('profile_picute')
    localStorage.removeItem("user_id")
    localStorage.removeItem("username")
    localStorage.removeItem("location")
    localStorage.removeItem("destination")
  }

  render() {
   
    return (
        <>
            <NavLink 
                to="/Account"
                activeClassName=""
                onClick={this.deletJWT}
                > 
                <Button className="btnSign" color="success" >Logout </Button>
            </NavLink>
  
      </>

    );
  }
}

export default Logout;












  
  

