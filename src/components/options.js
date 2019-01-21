import React, { Component } from 'react'
import inputs from './inputs.json'
import _ from 'lodash'
import './style.css'

class Options extends Component {
  state = {
    speed: 3,
    fps: 60,
    x: 100,
    y: 100
  }

  changeValue = (e, obj) => {
    let value = e.target.value
    let label = e.target.getAttribute('label')
    this.setState({
      [label]: +value
    }, () => {
      obj[`set${label[0].toUpperCase()+label.slice(1)}`] = +value
    })
  }

  render() {
    return (
      <ul className='options'>
        { inputs.map((field, i) => (
            <li key={i}>
              <span>Set {field.label}</span>
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