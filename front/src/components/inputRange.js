import * as React from 'react';
import { Range } from 'react-range';

export default class inputRange extends React.Component {
  state = { values: [2] };
  render() {
      console.log(this.state.values)
    return (
      <Range
        step={0.01}
        min={0.60}
        max={9.60}
        values={this.state.values}
        onChange={values => this.setState({ values })}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '6px',
              width: '100%',
              backgroundColor: '#ccc'
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '15px',
              width: '25px',
              borderRadius: 5,
              backgroundColor: '#019e45'
            }}
          />
        )}
      />
    );
  }
}