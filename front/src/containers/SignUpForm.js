import React from 'react'
import '../styles/signup.css';
import { Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody,Button, Form, FormGroup , Label, Input} from 'reactstrap';

  export default class SignUpForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          
        }

      }

      showForm=()=>{
          this.setState({showWhat:!this.state.showWhat})
      }

    render() {
        const {showWhat} = this.state

      return (
        <>
        <h1 className="signupHead"> SIGN UP</h1>
        <Form>
          <FormGroup>
            <Label for="exampleEmail">User name</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email address</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword"> password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Confirm password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
        </Form>
        <div className="warpBtn">  
          <Button className="btnLight"  >Sign up</Button>
          <Button className="btnLight" onClick={this.props.showForm} >Go to Log in</Button>
        </div>
  
    </>
      )
    }
  }

