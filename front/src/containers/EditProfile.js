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
    
    console.log("vale " + this.props)
    return (
      <div>
        <Button color="success" onClick={this.toggle}>Edit Profile</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Profile{this.props.username}</ModalHeader>
          {/* <ModalBody> */}
             <FormEdit  toggle={this.toggle} {...this.props}/>

          {/* </ModalBody> */}
          {/* <ModalFooter>
            <Button color="success" onClick={this.toggle}>Edit</Button>{' '}
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

export default EditProfile;
