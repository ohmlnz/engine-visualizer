import React, { Component } from 'react';
import PhysicsEntity from '../engine/core/models/entity.js';

class Canvas extends Component {
  state = {
    canvas: null
  };

  initializeCanvas = () => {
    const canvas = `<canvas id='canvas'></canvas`;
    const { game, state } = this.props;
    this.setState({ canvas }, () => {
      game.init(state);
    });
  };

  getCursorPosition = event => {
    const canvas = document.getElementById('canvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const { entities } = this.props.state;
    console.log(x);
    console.log(y);
    entities.push(new PhysicsEntity(x, y, 50, 50, 'green'));
    this.props.updateState({ entities });
  };

  componentDidMount() {
    this.initializeCanvas();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.state !== this.props.state) {
      this.initializeCanvas();
    }
  }

  render() {
    return <div onClick={this.getCursorPosition} dangerouslySetInnerHTML={{ __html: this.state.canvas }} />;
  }
}

export default Canvas;
