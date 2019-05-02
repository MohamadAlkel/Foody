import React from 'react';
import { Form, FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

const FormEdit = () => 
  <>
    <Form>
       <FormGroup>
          <Label for="exampleEmail">username</Label>
          <Input />
          {/* <FormFeedback>You will not be able to see this</FormFeedback> */}
          {/* <FormText>Example help text that remains unchanged.</FormText> */}
        </FormGroup>
        <FormGroup>
          <Label for="exampleEmail">job</Label>
          <Input  />
          {/* <FormFeedback valid>Sweet! that name is available</FormFeedback> */}
          {/* <FormText>Example help text that remains unchanged.</FormText> */}
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">Brief</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">user photo</Label>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level.
          </FormText>
        </FormGroup>
      </Form>   

  </>

export default FormEdit  