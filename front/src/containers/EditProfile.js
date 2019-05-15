import React from 'react';
import { Button, Modal, ModalHeader} from 'reactstrap';
import  FormEdit  from '../components/FormEdit';



export default class EditProfile extends React.Component {
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
      <>
        <Button color="success" onClick={this.toggle}>Edit Profile</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
          <FormEdit  toggle={this.toggle} editProfile={this.props.editProfile} {...this.props}/>
        </Modal>
      </>
    );
  }
}


