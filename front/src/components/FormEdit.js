import React from 'react';
import { Form, FormGroup, Label, Input, Button, FormText ,ModalBody, ModalFooter} from 'reactstrap';
import  Logout  from '../containers/Logout';
import axios from "axios";



const usernameValidate = username => {
  return /^(?=.{4,20}$)/.test(username)
}

const workValidate = work => {
  return /^(?=.{4,}$)/.test(work)
}

const briefValidate = brief => {
  return /^(?=.{30,}$)/.test(brief)
}


class FormEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileUpload: {},
      username:this.props.username,
      work:this.props.work,
      brief:this.props.brief,
      validateUsername: true,
      validateWork: true,
      validateBrief: true,
      
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



  submitHandler = (e) => {
    // debugger

    // alert('Success');
        e.preventDefault();
        let formData = new FormData() // instantiate it
        const {fileUpload, username, work, brief}=this.state
      
        formData.append('photo', fileUpload, fileUpload.name)
        
        formData.append('username', username)
        formData.append('work', work)
        formData.append('brief', brief)
        formData.append('time', Date.now())

        // console.log(formData)
        // const data ={
        //   name: this.state.name,
        //   tag_parent:this.state.tag_parent,
        //   tag_children:this.state.tag_children,
        //   description: this.state.description,
        //   image: formData
          
        // }


        const validateUsername = usernameValidate(username)
        const validateWork = workValidate(work)
        const validateBrief = briefValidate(brief)

        this.setState({ 
          validateUsername,
          validateWork,
          validateBrief,
       
        })

        if (validateWork && validateBrief && validateUsername ){

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
        
        
    
  }

  
  
  
  render() {
    const{validateWork, validateBrief, validateUsername, username, work, brief} = this.state

    return (
  <>
  <ModalBody>
    <Form onSubmit={this.submitHandler}>
       <FormGroup>
          <Label for="exampleEmail">_username</Label>
          <Input name="username" value={username}  onChange={this.handleEdit}/>
          <div className="textRed ml-2 mt-1" >
                {!validateUsername?`- Oops! characters long is 4-20`:``}
          </div>
       
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">_job</Label>
          <Input name="work" value={work} onChange={this.handleEdit} />
          <div className="textRed ml-2 mt-1" >
                {!validateWork?`- Oops! characters at least 4`:``}
          </div>

        </FormGroup>
        <FormGroup>
          <Label for="exampleText">_Brief</Label>
          <Input name="brief" value={brief} onChange={this.handleEdit} type="textarea"  id="exampleText" />
          <div className="textRed ml-2 mt-1" >
                {!validateBrief?`- Oops! characters at least 30`:``}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="exampleFile">_Images</Label>
          <Input  type="file" name="file" onChange={this.selectImage} id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level.
          </FormText>
        </FormGroup>



        

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