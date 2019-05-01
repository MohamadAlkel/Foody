import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import  FormEdit  from '../components/FormEdit';



class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="success" onClick={this.toggle}>Edit Profile</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <ModalBody>
             <FormEdit/>

          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.toggle}>Edit</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditProfile;
