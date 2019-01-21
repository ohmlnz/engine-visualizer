import React, { Component } from 'react'

class Canvas extends Component {
  render() {
    return (
      <div>
        { this.props.game.init() }
      </div>
    )
  }
}

export default Canvas
