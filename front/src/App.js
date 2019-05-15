
import './styles/navbar.css';
import Logo from './styles/img/logos.png'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem
  } from 'reactstrap';
import React, { Component } from 'react';
import './App.css';
import  Recipe  from './pages/Recipe';
import  Ex  from './pages/Ex';
import  Portfolio  from './pages/Portfolio';
import Notfound  from "./pages/Notfound";
import  SignupLogin  from './pages/SignupLogin';
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
      logout:localStorage.username,
      dropdownOpen: false,
      userUrl:""
    };

    this.toggle = this.toggle.bind(this);
    this.toggleBtn = this.toggleBtn.bind(this);
  }

  componentWillMount(){
    this.setState({userUrl:localStorage.id})
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
    localStorage.removeItem("id")
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
                      Favorite
                      </NavLink>
                    </NavItem>
                    </div>
                    <div className={navbaritem}>
                    <NavItem>
                      <NavLink 
                        to={`/Profile/${this.state.userUrl}`}
                        activeClassName="activeNav"
                        className="navitem green"
                      > 
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
            <Route path="/Profile/:id" component={Portfolio} />
            <Route path="/Account" component={SignupLogin} />
            <Route  component={Notfound} />
          </Switch>

        </div>
      </Router>
    );
  }
}

export default App;












  
  

