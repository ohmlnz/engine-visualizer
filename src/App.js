import React, { Component } from 'react';
import Game from './engine/game.js';
import PhysicsEntity from './engine/core/model.js';
import Engine from './engine/core/engine.js';
import Canvas from './components/canvas';
import Options from './components/options';
import Controls from './engine/controller/controls.js';
import { levelOne, randomLevel } from './engine/maps/level-1.js';

class App extends Component {
  createEntities = level => {
    let entities = [];
    Object.entries(level).forEach(e => {
      entities.push(new PhysicsEntity(...e[1].dimensions, e[1].color));
    });
    return entities;
  };

  render() {
    const player = new PhysicsEntity(100, 200, 50, 50, 'black');
    const entities = this.createEntities(randomLevel());
    const controls = new Controls();
    const engine = new Engine();
    const game = new Game(player, entities, engine, controls);
    return (
      <div className="App">
        <Canvas game={game} />
        {/* <Options game={game} /> */}
      </div>
    );
  }
}

export default App;
