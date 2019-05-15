import React from 'react';
import { Button, Modal, ModalHeader } from 'reactstrap';
import  FormRecipe  from '../components/FormRecipe';


export default class AddNew extends React.Component {
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
        <Button color="success" onClick={this.toggle}>Add New Recipe</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add New Recipe</ModalHeader>
          <FormRecipe addRecipe={this.props.addRecipe} toggle={this.toggle}/>
        </Modal>
      </>
    )
  }
}

 
