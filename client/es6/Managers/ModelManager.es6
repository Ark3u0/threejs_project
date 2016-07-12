import ThreeJS from 'three';
import Player from '../Models/Player.es6';

const ROOM_SCALE = 30;

class ModelManager {
    constructor(options) {
        this.player = new Player({scene: options.scene, camera: options.camera});
        this.scene = options.scene;

        this.initializeModelsInScene();
    }

    onLoad(object) {
        // This is placeholder until actual materials are applied
        let materialObj = new ThreeJS.MeshBasicMaterial({
            //vertexColors: ThreeJS.FaceColors,
            //overdraw: 0.5,
            color: 0xd20000
        });

        object.traverse((child) => {
            if (child instanceof ThreeJS.Mesh) {
                child.material = materialObj;
            }
        });

        object.position.set(-5, 1, 7.5);
        this.scene.add(object);
    }

    initializeModelsInScene(scene) {
        // Load model
        let objectLoader = new ThreeJS.ObjectLoader();
        objectLoader.load('models/popUpProjection.json', (object) => this.onLoad(object));

        // Create floor and walls
        this.createFloor();
        this.createWalls();
    }

    createFloor() {
        let geometry = new ThreeJS.BoxGeometry(ROOM_SCALE, 1, ROOM_SCALE);
        let material = new ThreeJS.MeshBasicMaterial({color: 0xbda27e});
        let floor = new ThreeJS.Mesh(geometry, material);
        floor.name = "FLOOR";
        this.scene.add(floor)
    }

    createWalls() {
        let geometry1 = new ThreeJS.BoxGeometry(ROOM_SCALE, 7, 1);
        let material1 = new ThreeJS.MeshBasicMaterial({color: 0xb2b1af});
        let wall1 = new ThreeJS.Mesh(geometry1, material1);
        wall1.name = "WALL_1";
        wall1.position.set(0, 2.5, ROOM_SCALE / 2.0);
        this.scene.add(wall1);

        let geometry2 = new ThreeJS.BoxGeometry(ROOM_SCALE, 7, 1);
        let material2 = new ThreeJS.MeshBasicMaterial({color: 0xb2b1af});
        let wall2 = new ThreeJS.Mesh(geometry2, material2);
        wall2.name = "WALL_2";
        wall2.position.set(0, 2.5, -ROOM_SCALE / 2.0);
        this.scene.add(wall2);

        let geometry3 = new ThreeJS.BoxGeometry(1, 7, ROOM_SCALE);
        let material3 = new ThreeJS.MeshBasicMaterial({color: 0xb2b1af});
        let wall3 = new ThreeJS.Mesh(geometry3, material3);
        wall3.name = "WALL_3";
        wall3.position.set(ROOM_SCALE / 2.0, 2.5, 0);
        this.scene.add(wall3);

        let geometry4 = new ThreeJS.BoxGeometry(1, 7, ROOM_SCALE);
        let material4 = new ThreeJS.MeshBasicMaterial({color: 0xb2b1af});
        let wall4 = new ThreeJS.Mesh(geometry4, material4);
        wall4.name = "WALL_4";
        wall4.position.set(-ROOM_SCALE / 2.0, 2.5, 0);
        this.scene.add(wall4);
    }

    update(input) {
        // First update player
        this.player.update(input);

        // Update rest of models and world state
        // ...
    }
}

module.exports = ModelManager;