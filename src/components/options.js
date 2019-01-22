import React, { Component } from 'react'
import inputs from './inputs.json'
import _ from 'lodash'
import './style.css'

class Options extends Component {
  state = {
    ay: 0,
    ax: 0.03,
    x: 100,
    y: 100
  }

  changeValue = (e, obj) => {
    let value = e.target.value
    let label = e.target.getAttribute('label')
    this.setState({ [label]: +value }, () => {
      obj[label] = +value
    })
  }

  render() {
    return (
      <ul className='options'>
        { inputs.map((field, i) => (
            <li key={i}>
              <span>{field.label}</span>
              <input 
                type='number' 
                label={field.label}
                onChange={(e) => this.changeValue(e, _.get(this.props, field.object))}
                value={this.state[field.label]}
              />
            </li>
        )) }
      </ul>
    )
  }
} 

export default Options