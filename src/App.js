import React, { Component } from 'react';
import Game from './engine/core/game.js';
import PhysicsEntity from './engine/core/model.js';
import Engine from './engine/core/engine.js';
import Canvas from './components/canvas';
import Options from './components/options';
import Controls from './engine/controller/controls.js';
import { levelOne, randomLevel } from './engine/maps/level-1.js';
import { constants } from './engine/constants.js';
import { spriteData } from './engine/sprites/businessman/businessman';

class App extends Component {
  state = { constants };

  createEntities(level) {
    let entities = [];
    Object.entries(level).forEach(l => {
      entities.push(new PhysicsEntity(...l[1].dimensions, l[1].color));
    });
    return entities;
  }

  createSpriteSheetMapping(data) {
    const { frames, meta } = data;
    let spritesheet = {
      sheet: { image: meta.image, size: meta.size }
    };
    Object.keys(frames).forEach(e => {
      const current =
        spritesheet[frames[e].type] &&
        spritesheet[frames[e].type][frames[e].direction];
      const sprite = current ? [...current] : [];
      sprite.push(frames[e].frame);

      spritesheet = {
        ...spritesheet,
        [frames[e].type]: {
          ...spritesheet[frames[e].type],
          [frames[e].direction]: sprite
        }
      };
    });
    return spritesheet;
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
      () => (game.player[label] = +value)
    );
  };

  render() {
    const { constants } = this.state;
    const { x, y } = constants;
    const spritesheet = this.createSpriteSheetMapping(spriteData);
    const player = new PhysicsEntity(x, y, 32, 32, 'black', spritesheet);
    const entities = this.createEntities(levelOne);
    const controls = new Controls();
    const engine = new Engine();
    const game = new Game(player, entities, engine, controls);

    return (
      <div className="App">
        <Canvas game={game} state={constants} />
        <Options game={game} state={constants} changeValue={this.changeValue} />
      </div>
    );
  }
}

export default App;
