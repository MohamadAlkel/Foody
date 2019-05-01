import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, FormText , Row} from 'reactstrap';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
 
 
export default class Country extends Component {
  constructor (props) {
    super(props);
    this.state = { country: '', region: '' };
  }
 
  selectCountry (val) {
    this.setState({ country: val });
  }
 
  selectRegion (val) {
    this.setState({ region: val });
  }
 
  render () {
    const { country, region } = this.state;
    return (
      <div>

        <FormGroup>
            <Label for="exampleSelect">_Select Country</Label>
            <CountryDropdown 
            className="form-control"
            value={country}
            onChange={(val) => this.selectCountry(val)} />
        </FormGroup>
        
      </div>
    );
  }
}