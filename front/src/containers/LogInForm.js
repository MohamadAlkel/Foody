import React,{Component} from 'react'
import '../styles/signup.css';
import { Card, CardImg, CardTitle, CardText, CardColumns,
  CardSubtitle, CardBody,Button, Form, FormGroup , Label, Input} from 'reactstrap';


  class LogInForm extends Component {
    constructor(props) {
      super(props);
      
    }

    render() {
      return (
        <>
      
        <h1 className="signupHead"> LOG IN</h1>
        <Form>
          
          <FormGroup>
            <Label for="exampleEmail">Email address</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword"> password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
          </FormGroup>
          
        </Form>
        <div className="warpBtn">  
          <Button className="btnLight"  >Log in</Button>
          <Button className="btnLight" onClick={this.props.showForm}>Go to Sign up</Button>
        </div>
      
    </>
      );
    }
  }
  
  export default LogInForm;
