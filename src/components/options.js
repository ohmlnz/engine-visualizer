import React, { Component } from 'react';
import BackgroundPicker from './background';
import _ from 'lodash';
import './style.css';

class Options extends Component {
  state = {
    value: 'Select entity',
    current: []
  };

  componentDidMount() {
    const { x, y } = this.props.state.entities[0];
    this.setState({ current: [x, y] });
  }

  switchEntity = event => {
    const index = event.target.value.split('-')[1];
    const { value } = this.state;
    const { entities } = this.props.state;
    const { x, y } = entities[index];

    // reset previous states
    if (!value.includes('Select')) entities[this.state.value.split('-')[1]].selected = false;

    this.setState({ value: event.target.value, current: [x, y] }, () => {
      entities[index].selected = true;
    });
  };

  render() {
    const { game, changeValue, state, changeBackground } = this.props;
    const { constants } = state;
    return (
      <div>
        <div className="entity-editor">
          <span>Entity selection:</span>
          <select onChange={this.switchEntity} value={this.state.value}>
            {state.entities.map((e, i) => (
              <option value={`entity-${i}`}>{`entity-${i}`}</option>
            ))}
          </select>
          <span>
            x: {this.state.current[0]} y: {this.state.current[1]}
          </span>
        </div>
        <ul className="options">
          {Object.keys(constants).map((label, i) => (
            <li key={i}>
              <span>{label}</span>
              <input type="number" label={label} onChange={e => changeValue(e, game)} value={constants[label]} />
            </li>
          ))}
        </ul>
        <BackgroundPicker changeBackground={changeBackground} />
      </div>
    );
  }
}

export default Options;
