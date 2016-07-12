import InputController from './Controllers/InputController.es6';
import ModelManager from './Managers/ModelManager.es6';

class GameEngine {
    constructor(options) {
        // Initialize controllers
        this.inputController = new InputController();
        this.inputController.listenForInputs();

        // Initialize engines
        this.modelManager = new ModelManager(options);
    }

    loop(timeElapsed, scene, camera) {
        let input = this.inputController.getCurrentInputInQueue();
        this.modelManager.update(input, camera);
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