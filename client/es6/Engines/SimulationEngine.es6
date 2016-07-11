import ThreeJS from 'three';

class SimulationEngine {
    constructor(options) {
        this.initializeObjects(options.scene)
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

    initializeObjects(scene) {
        // Initialize objects in object table
        this.objectTable = [];

        let objectLoader = new ThreeJS.ObjectLoader();
        objectLoader.load('models/popUpProjection.json', (object) => this.onLoad(scene, object));

    }
}

module.exports = SimulationEngine;