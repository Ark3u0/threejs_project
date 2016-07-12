import InputController from './Controllers/InputController.es6';
import ModelManager from './Managers/ModelManager.es6';

class GameEngine {
    constructor(options) {
        // Initialize controllers
        this.inputController = new InputController();
        this.inputController.listenForInputs();

        // Initialize engines
        this.modelManager = new ModelManager({scene: options.scene, camera: options.camera});
    }

    loop(timeElapsed, scene, camera) {
        let input = this.inputController.getCurrentInputInQueue();
        this.modelManager.update(input);
    }
}

module.exports = GameEngine;