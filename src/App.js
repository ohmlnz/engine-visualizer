import React, { Component } from 'react';
import Game from './engine/game.js';
import PhysicsEntity from './engine/core/model.js';
import Engine from './engine/core/engine.js';
import Canvas from './components/canvas';
// import Options from './components/options';
import Controls from './engine/controller/controls.js';
import { levelOne, randomLevel } from './engine/maps/level-1.js';
import { spriteData } from './engine/sprites/businessman/businessman';

class App extends Component {
  createEntities(level) {
    let entities = [];
    Object.entries(level).forEach(l => {
      entities.push(new PhysicsEntity(...l[1].dimensions, l[1].color));
    });
    return entities;
  }

  createSpritesheetMapping(data) {
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

  render() {
    const spritesheet = this.createSpritesheetMapping(spriteData);
    const player = new PhysicsEntity(100, 200, 50, 50, 'black', spritesheet);
    const entities = this.createEntities(levelOne);
    const controls = new Controls();
    const engine = new Engine();
    const game = new Game(player, [], engine, controls);
    return (
      <div className="App">
        <Canvas game={game} />
        {/* <Options game={game} /> */}
      </div>
    );
  }
}

export default App;
