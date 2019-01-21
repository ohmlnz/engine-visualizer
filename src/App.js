import React, { Component } from 'react'
import Game from './engine/game.js'
import PhysicsEntity from './engine/core/model.js'
import Controls from './engine/controller/controls.js'
import Engine from './engine/core/engine.js'
import Canvas from './components/canvas'
import Options from './components/options'

class App extends Component {
  render() {
    let player = new PhysicsEntity(100, 100, 'red');
    let entity = new PhysicsEntity(170, 100, 'blue');
    let engine = new Engine();
    let controls = new Controls(player);
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
