import React, { Component } from 'react';
import Game from './engine/core/game.js';
import PhysicsEntity from './engine/core/models/entity.js';
import Player from './engine/core/models/player.js';
import Enemy from './engine/core/models/enemy.js';
import Engine from './engine/core/engine.js';
import Canvas from './components/canvas';
import Options from './components/options';
import Controls from './engine/controller/controls.js';
import { levelOne } from './engine/maps/level-1.js';
import { constants } from './engine/constants.js';
import { spriteData } from './engine/sprites/businessman/businessman';
import { smokeParticles } from './engine/sprites/particles/smoke';
import { displacePoints, generateBackground, createSpriteSheetMapping } from './engine/maps/helpers.js';

class App extends Component {
  state = { constants };

  componentDidMount() {
    this.changeBackground();
    this.createEntities(levelOne);
  }

  changeBackground = image => {
    if (!image) {
      // Generate random layers
      const layer1 = displacePoints([-200, constants.height], [1500, constants.height], 1.2, 325, 10);
      const layer2 = displacePoints([-100, constants.height], [1010, constants.height], 1.5, 100, 10);

      this.setState({
        background: generateBackground([layer1, layer2]).src
      });
    } else {
      this.setState({ background: image });
    }
  };

  createEntities(level) {
    let entities = [];
    Object.entries(level).forEach(l => {
      entities.push(new PhysicsEntity(...l[1].dimensions, l[1].color));
    });
    this.setState({ entities });
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
    const { constants, entities } = this.state;
    const { x, y } = constants;
    const spritesheet = createSpriteSheetMapping(spriteData);
    const particles = createSpriteSheetMapping(smokeParticles);
    const player = new Player(x, y, 32, 32, 'black', spritesheet);
    const enemy = new Enemy(x, y, 32, 32, 'black', spritesheet);
    const controls = new Controls();
    const engine = new Engine();
    const game = new Game(player, entities, enemy, engine, controls);
    const initialState = { game: game, state: this.state };
    const updateState = this.setState.bind(this);
    return (
      <div className="App">
        {this.state.background && this.state.entities && (
          <>
            <Canvas {...initialState} updateState={updateState} />
            <Options {...initialState} changeBackground={this.changeBackground} changeValue={this.changeValue} />
          </>
        )}
      </div>
    );
  }
}

export default App;
