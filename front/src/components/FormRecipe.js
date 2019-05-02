import React from 'react';
import { Form, FormGroup, Label, Input, Col, FormText , Row} from 'reactstrap';
import '../styles/Portfolio.css';

import  Country  from './CountrySelector';



const FormRecipe = () => 
  <>
    <Form>
    <Row form>

    <Col md={12}>
           <FormGroup>
             <Label for="exampleEmail">_Recipe name</Label>
            <Input />
           </FormGroup>
    </Col>

        <Col md={12}>
        <FormGroup>
          <Label for="exampleText">_Ingredients</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleText">_Directions</Label>
          <Input type="textarea" name="text" id="exampleText" />
        </FormGroup>

        </Col>
        <Col md={12}>
        <Label>_Prep time</Label>
        </Col>
        <Col md={6}>
            <FormGroup >
            <Label className="size" for="exampleTime">Hours</Label>
            <Input
                type="number"
                name="time"
                id="exampleTime"
                placeholder="0"
                min="0" max="9"
                
            />
            </FormGroup>

        </Col>
        <Col md={6}>
        <FormGroup >

           <Label  className="size" for="exampleTime">Seconds</Label>
          <Input
            type="number"
            name="time"
            id="exampleTime"
            placeholder="00"
            min="10" max="59"
            
            
          />
        </FormGroup>

        </Col>

        <Col md={12}>

            <Country/>
        </Col>
      
        <Col md={12}>
        <FormGroup>
          <Label for="exampleFile">_Images</Label>
          <Input type="file" name="file" id="exampleFile" />
          <FormText color="muted">
            This is some placeholder block-level.
          </FormText>
        </FormGroup>
        </Col>
        

        </Row>
   
      </Form>   

  </>

export default FormRecipe  