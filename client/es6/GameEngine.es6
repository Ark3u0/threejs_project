import InputController from './InputControllers/InputController.es6';
import SimulationEngine from './Engines/SimulationEngine.es6';

class GameEngine {
    constructor(options) {
        // Initialize controllers
        this.inputController = new InputController();
        this.inputController.listenForInputs();

        // Initialize engines
        this.simulationEngine = new SimulationEngine(options);
    }

    loop(timeElapsed, scene, camera) {
        let input = this.inputController.getCurrentInputInQueue();
    }

    //addCubeToScene() {
  //    let geometry = new ThreeJS.BoxGeometry(1, 1, 1);
  //    let material = new ThreeJS.MeshBasicMaterial({
  //       color: 0x00ff00
  //    });
  //    this.cube = new ThreeJS.Mesh(geometry, material);
  //    this.scene.add(this.cube);
  //}
}

module.exports = GameEngine;