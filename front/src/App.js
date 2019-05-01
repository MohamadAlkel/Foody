
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
  Button
  } from 'reactstrap';
import React, { Component } from 'react';
import './App.css';
import  Recipe  from './pages/Recipe';
import  Ex  from './pages/Ex';
// import  Contact  from './pages/Contact';
import  Portfolio  from './pages/Portfolio';
import Notfound  from "./pages/Notfound";
import  Signup  from './pages/Signup';
import  Login  from './pages/Login';
import {
  Route,
  NavLink,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
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
                  <Nav className="ml-auto smallnavbar" navbar>
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
                        to="/Experience"
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
                        to="/Portfolio"
                        activeClassName="active"
                        className="navitem green"
                      > 
                      {/* <img className="imges" src={portfolio} alt="img" /> */}
                      Recipe
                      </NavLink>
                    </NavItem>
                    </div>
                    
                    <Button className="btns" color="success" >Sign in/Sign up</Button>
                  </Nav>
                </Collapse>
            </Navbar>
        
          <Switch>
            <Route exact path="/" component={Recipe} />
            <Route path="/Experience" component={Ex} />
            <Route path="/Portfolio" component={Portfolio} />
            <Route path="/Signup" component={Signup} />
            <Route path="/Login" component={Login} />
            <Route  component={Notfound} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;












  
  

