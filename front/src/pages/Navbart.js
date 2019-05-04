
import '../styles/navbar.css';
import Logo from '../styles/img/logos.png'
import Recipe_img from '../styles/img/profile.png'
import work from '../styles/img/work.png'
import portfolio from '../styles/img/portfolio.png'
import contact from '../styles/img/contact.png'
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
import '../App.css';
import  Recipe  from './Recipe';
import  Ex  from './Ex';
// import  Contact  from './Contact';
import  Portfolio  from './Portfolio';
import Notfound  from "./Notfound";
import  SignupLogin  from './SignupLogin';
import  Logout  from '../containers/Logout';

import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'




class Navbart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      logout:localStorage.username
    };

    this.toggle = this.toggle.bind(this);
  }

  componentWillMount(){
    // window.location.reload();

  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
   
    });
  }

  logoutHandler = () =>{
    localStorage.removeItem("JWT")
    localStorage.removeItem('profile_picute')
    localStorage.removeItem("user_id")
    localStorage.removeItem("username")
    localStorage.removeItem("location")
    localStorage.removeItem("destination")
    // this.setState({logout: true})
    window.location.reload()
  }

  render() {
      let navbaritem = "onenav "
      if(this.state.isOpen){navbaritem += "open"} 
      // if(this.state.logout === true){return <Redirect to='/Account'/>}
      console.log(window.location)
      // window.location.reload();


    return (
      <>
        <div className="App hhh">
          <Navbar className="navstyle" light expand="xl">
            <NavbarBrand href="/">  <img src={Logo} height="35px" alt="img"/> </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse className="" isOpen={this.state.isOpen} navbar>
                  <Nav className="m-auto smallnavbar" navbar>
                    <div className={navbaritem}>
                    <NavItem>
                      <NavLink 
                        exact  to="/"
                        activeClassName="active"
                        className="navitem" 
                      > 
                      Recipe
                      </NavLink>
                    </NavItem>  
                    </div>
                    <div className={navbaritem}>
                    <NavItem>
                      <NavLink 
                        to="/Favorite"
                        activeClassName="active"
                        className="navitem blue"
                      > 
                      {/* <img className="imges" src={work} alt="img"/> */}
                      Favorite
                      </NavLink>
                    </NavItem>
                    </div>
                    <div className={navbaritem}>
                    <NavItem>
                      <NavLink 
                        to="/Profile"
                        activeClassName="active"
                        className="navitem green"
                      > 
                      {/* <img className="imges" src={portfolio} alt="img" /> */}
                      Profile
                      </NavLink>
                    </NavItem>
                    </div>
                    
                  </Nav>
                  {/* <Logout/> */}
                    {/* {this.state.logout} */}
                  {!<NavLink 
                        to="/Account"
                        activeClassName=""
                        onClick={"window.location.reload()"}
                      > 
                  <Button className="btnSign" color="success" ></Button>
                  </NavLink>?
                  <NavLink 
                        to="/Account"
                        onClick={this.logoutHandler}
                        onClick={"window.location.reload()"}
                        activeClassName=""
                      > 
                  <Button className="btnSign" color="success" >Log in/Sign up</Button>
                  </NavLink>:
                  <NavLink 
                        to="/Account"
                        activeClassName=""
                        onClick={"window.location.reload()"}
                      > 
                  <Button className="btnSign" color="success" >Logout</Button>
                  </NavLink>
                  
                  }
                  
                </Collapse>
            </Navbar>
        
          {/* <Switch>
            <Route exact path="/" component={Recipe} />
            <Route path="/Favorite" component={Ex} />
            <Route path="/Profile" component={Portfolio} />
            <Route path="/Account" component={SignupLogin} />
            <Route  component={Notfound} />
          </Switch> */}

        </div>
      </>
    );
  }
}

export default Navbart;












  
  

