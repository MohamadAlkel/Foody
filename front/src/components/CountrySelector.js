import React, { Component } from 'react';
import { FormGroup} from 'reactstrap';
import { CountryDropdown } from 'react-country-region-selector';
 
 
export default class Country extends Component {
  constructor (props) {
    super(props);
    this.state = { 
      country: ''
    };
  }
 
  selectCountry (val) {
    this.setState({ country: val });
    this.props.selectCountry(val)
  }
 
 
  render () {
    const { country} = this.state;
    return (
      <>
        <FormGroup> 
          <CountryDropdown 
            className="form-control"
            value={country}
            onChange={(val) => this.selectCountry(val)}
          />
        </FormGroup>
      </>
    );
  }
}