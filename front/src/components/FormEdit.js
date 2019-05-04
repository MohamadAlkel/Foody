import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormText ,ModalBody, ModalFooter} from 'reactstrap';
import  Logout  from '../containers/Logout';



class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };

  }

  handleEdit(){
    this.setState({})
  }

  editProfile(){

  }
 
  render() {
    const{username, work, brief} = this.props
    console.log("hered" + this.props.username)
    return (
  <>
  <ModalBody>
    <Form onSubmit={this.editProfile}>
       <FormGroup>
          <Label for="exampleEmail">_username</Label>
          <Input name="username" value={username} onChange={this.handleEdit}/>
          {/* <FormFeedback>You will not be able to see this</FormFeedback> */}
          {/* <FormText>Example help text that remains unchanged.</FormText> */}
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">_job</Label>
          <Input name="work" value={work} onChange={this.handleEdit} />
          {/* <FormFeedback valid>Sweet! that name is available</FormFeedback> */}
          {/* <FormText>Example help text that remains unchanged.</FormText> */}
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">_Brief</Label>
          <Input name="brief" value={brief} onChange={this.handleEdit} type="textarea"  id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">_Images</Label>
          <Input  type="file" name="file" id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level.
          </FormText>
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">_Logout</Label><br/>
          <Logout/>

        </FormGroup>

      <ModalFooter className="p-0 pt-3 ">
        <Button color="success" onClick={this.props.toggle}>Edit</Button>{' '}
      </ModalFooter>

      </Form>
      </ModalBody>   
  </>
    )
  }
}

export default FormEdit  