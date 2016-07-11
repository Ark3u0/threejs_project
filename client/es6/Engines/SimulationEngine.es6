import ThreeJS from 'three';

class SimulationEngine {
    constructor(options) {
        this.initializeObjects(options.scene)
    }

    onLoad(scene, geometry, materials) {
        let material = new ThreeJS.MultiMaterial(materials);
        let object = new ThreeJS.Mesh(geometry, material);
        this.objectTable.push(object);
        scene.add(object);
    }

    initializeObjects(scene) {
        // Initialize objects in object table
        this.objectTable = [];

        let objectLoader = new ThreeJS.ObjectLoader();
        objectLoader.load(
            'models/popUpProjection.json',
            (geometry, materials) => this.onLoad(scene, geometry, materials)
        );
    }
}

module.exports = SimulationEngine;