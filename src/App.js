import React, { Component } from 'react'
import Game from './engine/game.js'
import PhysicsEntity from './engine/core/model.js'
import Engine from './engine/core/engine.js'
import Canvas from './components/canvas'
import Options from './components/options'
import Controls from './engine/controller/controls.js';

class App extends Component {
  render() {
    let player = new PhysicsEntity(100, 200, 'black');
    let entity = new PhysicsEntity(200, 200, 'blue');
    let controls = new Controls()
    let engine = new Engine();
    let game = new Game(player, entity, engine, controls)
    return (
      <div className="App">
        <Canvas game={game} />
        <Options game={game} />
      </div>
    );
  }
}

export default App;
