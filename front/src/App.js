
import './styles/navbar.css';
import Logo from './styles/img/logos.png'
import Recipe_img from './styles/img/profile.png'
import work from './styles/img/work.png'
import portfolio from './styles/img/portfolio.png'
import contact from './styles/img/contact.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';
import React, { Component } from 'react';
import './App.css';
import  Recipe  from './pages/Recipe';
import  Ex  from './pages/Ex';
// import  Contact  from './pages/Contact';
import  Portfolio  from './pages/Portfolio';
import Notfound  from "./pages/Notfound";
import  SignupLogin  from './pages/SignupLogin';
import  Logout  from './containers/Logout';

import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      logout:localStorage.username,
      dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
    this.toggleBtn = this.toggleBtn.bind(this);
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
   
    });
  }

  toggleBtn() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  logoutHandler = () =>{
    localStorage.removeItem("JWT")
    localStorage.removeItem('profile_picute')
    localStorage.removeItem("user_id")
    localStorage.removeItem("username")
    localStorage.removeItem("location")
    localStorage.removeItem("destination")
  }



  render() {
      let navbaritem = "onenav "
      if(this.state.isOpen){navbaritem += "open"} 
     


    return (
      <Router>
        <div className="App">
          <Navbar className="navstyle" light expand="xl">
            <NavbarBrand href="/">  <img src={Logo} height="35px" alt="img"/> </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse className="" isOpen={this.state.isOpen} navbar>
                  <Nav className="m-auto smallnavbar" navbar>
                    <div className={navbaritem}>
                    <NavItem>
                      <NavLink 
                        exact  to="/"
                        activeClassName="activeNav"
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
                        activeClassName="activeNav"
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
                        activeClassName="activeNav"
                        className="navitem green"
                      > 
                      {/* <img className="imges" src={portfolio} alt="img" /> */}
                      Profile
                      </NavLink>
                    </NavItem>
                    </div>
                    
                  </Nav>

                  <ButtonDropdown  isOpen={this.state.dropdownOpen} toggle={this.toggleBtn}>
                    <DropdownToggle color="success" className="btnSign" caret>
                      Account
                    </DropdownToggle>
                    <DropdownMenu>

                    <NavLink 
                        to="/Account"
                        activeClassName=""
                        className="account"
                      > 
                      <DropdownItem >Log in/Sign up</DropdownItem>
                    </NavLink>
                      <DropdownItem divider />
                      <NavLink 
                        to="/Account"
                        activeClassName=""
                        className="account"
                      >   
                      <DropdownItem onClick={this.logoutHandler}>Log out</DropdownItem>
                    </NavLink>
                    </DropdownMenu>
                  </ButtonDropdown>
                  
                  
                  
                </Collapse>
            </Navbar>
            
        
          <Switch>
            <Route exact path="/" component={Recipe} />
            <Route path="/Favorite" component={Ex} />
            <Route path="/Profile" component={Portfolio} />
            <Route path="/Account" component={SignupLogin} />
            <Route  component={Notfound} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;












  
  

