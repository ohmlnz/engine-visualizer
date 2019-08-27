import React, { Component } from 'react';
import Game from './engine/core/game.js';
import PhysicsEntity from './engine/core/models/entity.js';
import Player from './engine/core/models/player.js';
import Engine from './engine/core/engine.js';
import Canvas from './components/canvas';
import Options from './components/options';
import Controls from './engine/controller/controls.js';
import { levelOne } from './engine/maps/level-1.js';
import { constants } from './engine/constants.js';
import { spriteData } from './engine/sprites/businessman/businessman';
import { smokeParticles } from './engine/sprites/particles/smoke';
import {
  displacePoints,
  generateBackground,
  createSpriteSheetMapping
} from './engine/maps/helpers.js';

class App extends Component {
  state = { constants };

  componentDidMount() {
    this.changeBackground();
  }

  changeBackground = () => {
    // Generate random layers
    const layer1 = displacePoints([-10, 250], [1010, 250], 1.3, 225, 10);
    const layer2 = displacePoints([-10, 250], [1010, 250], 1.2, 125, 10);

    this.setState({
      background: generateBackground([layer1, layer2]).src
    });
  };

  createEntities(level) {
    let entities = [];
    Object.entries(level).forEach(l => {
      entities.push(new PhysicsEntity(...l[1].dimensions, l[1].color));
    });
    return entities;
  }

  changeValue = (e, game) => {
    let value = e.target.value;
    let label = e.target.getAttribute('label');
    this.setState(
      {
        constants: {
          ...this.state.constants,
          [label]: +value
        }
      },
      () => {
        if (game && game.player[label]) {
          game.player[label] = +value;
        }
      }
    );
  };

  render() {
    const { constants } = this.state;
    const { x, y } = constants;
    const spritesheet = createSpriteSheetMapping(spriteData);
    const particles = createSpriteSheetMapping(smokeParticles);
    const entities = this.createEntities(levelOne);
    const player = new Player(x, y, 32, 32, 'black', spritesheet);
    const controls = new Controls();
    const engine = new Engine();
    const game = new Game(player, entities, engine, controls);

    return (
      <div className="App">
        <Canvas game={game} state={this.state} />
        <Options game={game} state={constants} changeValue={this.changeValue} />
        <div className="background-picker" onClick={this.changeBackground}>
          Change background
        </div>
      </div>
    );
  }
}

export default App;
