import React from "react";
import { ConstantsContext } from "../App.js";
import _ from "lodash";
import "./style.css";

const Options = ({ game, changeValue }) => {
  const renderLabels = obj => {
    for (let label in obj) {
      return (
        <li key={label}>
          <span>{label}</span>
          <input
            type="number"
            label={label}
            onChange={e => changeValue(e, _.get(game, field.object))}
            value={object[label]}
          />
        </li>
      );
    }
  };

  return (
    <ConstantsContext.Consumer>
      {state => (
        <ul className="options">{this.renderLabels(state.constants)}</ul>
      )}
    </ConstantsContext.Consumer>
  );
};

export default Options;
