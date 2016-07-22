import InputController from './Controllers/InputController.es6';
import ModelManager from './Managers/ModelManager.es6';
import LightManager from './Managers/LightManager.es6';
import TextureManager from './Managers/TextureManager.es6';

class GameEngine {
    constructor(options) {
        this.textureManager = new TextureManager();
        this.modelManager = new ModelManager({scene: options.scene, camera: options.camera, textureManager: this.textureManager});
        this.inputController = new InputController();
        this.lightManager = new LightManager({scene: options.scene});

        this.textureManager.loadExternalTextureMapsToMemory(() => {
            this.modelManager.loadExternalModelsToMemory(() => {
                this.inputController.listenForInputs();

                this.modelManager.initializeModelsInScene();
                this.lightManager.initializeSpotlightsInScene();
                this.lightManager.initializeAmbientLightInScene();
            });
        });
    }

    loop(timeElapsed, scene, camera) {
        let input = this.inputController.getCurrentInputInQueue();
        this.modelManager.update(input);
    }
}

module.exports = GameEngine;