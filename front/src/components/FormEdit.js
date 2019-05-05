import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormText ,ModalBody, ModalFooter} from 'reactstrap';
import  Logout  from '../containers/Logout';
import axios from "axios";




class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUpload: {},
      username:this.props.username,
      work:this.props.work,
      brief:this.props.brief
      
    };

  }


  selectImage = e => {
    this.setState({fileUpload: e.target.files[0]})
  }

  handleEdit=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }

  // onFormSubmit = (e) => {
  //   e.preventDefault()
  //   let formData = new FormData() // instantiate it
    
  //   formData.append('image', this.state.fileUpload, this.state.fileUpload.name)

  //   axios({
  //     url: 'http://localhost:5000/api/v1/users/imges',
  //     method: "post", 
  //     headers: { 
  //       Authorization: `Bearer ${localStorage.getItem("JWT")}`,
  //       Accept: 'multipart/form-data'
  //     },
  //     data: formData,
  //   }).then( (response)=>{
      
  //     this.fetch_profile_img()
  //     this.setState({pictuer:response.data.image_url})           
  //   })
    
  // }



  submitHandler = (e) => {
    // debugger

    // alert('Success');
        e.preventDefault();
        let formData = new FormData() // instantiate it
      
        formData.append('photo', this.state.fileUpload, this.state.fileUpload.name)
        
        formData.append('username', this.state.username)
        formData.append('work', this.state.work)
        formData.append('brief', this.state.brief)

        // console.log(formData)
        // const data ={
        //   name: this.state.name,
        //   tag_parent:this.state.tag_parent,
        //   tag_children:this.state.tag_children,
        //   description: this.state.description,
        //   image: formData
          
        // }
        
        axios({
          url: `http://localhost:5000/api/v1/users/new`,
          method:"post",          
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("JWT"),
            Accept: 'multipart/form-data'
          },
          data: formData
        })
        .then((response)=> {
          window.location.reload()
          
        //  let items = [...this.state.items]
        //  items.push(response.data.user)
        //  this.setState({items:items})
        //  this.setState({showAddItemModel:false})
        //  this.setState({file_name: response.data.user.file_name})
        })
        .catch(function (error) {
          console.log(error);
        });

        this.props.toggle()
        
    
  }

  
  
  
  render() {
    const{username, work, brief} = this.state
    // this.props.update(username,work, brief)
    // console.log("lok it here plz " + this.props.getProfile)
    // console.log("looooook there " + this.state.fileUpload)
    return (
  <>
  <ModalBody>
    <Form onSubmit={this.submitHandler}>
       <FormGroup>
          <Label for="exampleEmail">_username</Label>
          <Input name="username" value={username}  onChange={this.handleEdit}/>
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
          <Input  type="file" name="file" onChange={this.selectImage} id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level.
          </FormText>
        </FormGroup>
        {/* <FormGroup>
          <Label for="exampleFile">_Logout</Label><br/>
          <Logout/>

        </FormGroup> */}


        

      <ModalFooter className="p-0 pt-3 ">
        <Button color="success" onClick={this.submitHandler}>Edit</Button>{' '}
      </ModalFooter>

      </Form>
      </ModalBody>   
  </>
    )
  }
}

export default FormEdit  