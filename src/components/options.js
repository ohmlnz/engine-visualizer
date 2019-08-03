import React from 'react';
import _ from 'lodash';
import './style.css';

const Options = ({ game, changeValue, state }) => {
  return (
    <ul className="options">
      {Object.keys(state).map((label, i) => (
        <li key={i}>
          <span>{label}</span>
          <input
            type="number"
            label={label}
            onChange={e => changeValue(e, game)}
            value={state[label]}
          />
        </li>
      ))}
    </ul>
  );
};

export default Options;
