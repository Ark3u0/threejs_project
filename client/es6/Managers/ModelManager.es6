import ThreeJS from 'three';
import Player from '../Models/Player.es6';


class ModelManager {
    constructor(options) {
        this.player = new Player(options);
        this.initializeModelsInScene(options.scene)
    }

    onLoad(scene, object) {
        // This is placeholder until actual materials are applied
        let materialObj = new ThreeJS.MeshBasicMaterial({
            vertexColors: ThreeJS.FaceColors,
            overdraw: 0.5
        });

        object.traverse((child) => {
            if (child instanceof ThreeJS.Mesh) {
                child.material = materialObj;
            }
        });

        this.objectTable.push(object);
        scene.add(object);

        this.objectTable[0].position.x = 0;
        this.objectTable[0].position.y = 0;
        this.objectTable[0].position.z = 0;
    }

    initializeModelsInScene(scene) {
        // Initialize objects in object table
        this.objectTable = [];

        let objectLoader = new ThreeJS.ObjectLoader();
        objectLoader.load('models/popUpProjection.json', (object) => this.onLoad(scene, object));
    }

    update(input, camera) {
        // First update player
        this.player.update(input, camera);

        // Update rest of models and world state
        // ...
    }
}

module.exports = ModelManager;