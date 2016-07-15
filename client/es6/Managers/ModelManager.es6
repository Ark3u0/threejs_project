import ThreeJS from 'three';
import Player from '../Player/Player.es6';
import CollisionManager from './../Player/CollisionDetector.es6';


const ROOM_SCALE = 30;

class ModelManager {
    constructor(options) {
        this.collisionManager = new CollisionManager();
        this.player = new Player({scene: options.scene, camera: options.camera, collisionManager: this.collisionManager});
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
                this.collisionManager.pushToCollidableList(child);
            }
        });

        object.position.set(-5, 1, 7.5);
        this.scene.add(object);
    }

    initializeModelsInScene() {
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
        this.collisionManager.pushToCollidableList(floor);
        this.scene.add(floor)
    }

    createWalls() {
        let geometry1 = new ThreeJS.BoxGeometry(ROOM_SCALE, 7, 1);
        //let material1 = new ThreeJS.MeshPhongMaterial({color: 0xb2b1af, specular: 0x555555, shininess: 30});
        let material1 = new ThreeJS.MeshBasicMaterial({color: 0xb2b1af});
        let wall1 = new ThreeJS.Mesh(geometry1, material1);
        wall1.name = "WALL_1";
        wall1.position.set(0, 2.5, ROOM_SCALE / 2.0);
        this.collisionManager.pushToCollidableList(wall1);
        this.scene.add(wall1);

        let geometry2 = new ThreeJS.BoxGeometry(ROOM_SCALE, 7, 1);
        //let material2 = new ThreeJS.MeshPhongMaterial({color: 0xb2b1af, specular: 0x555555, shininess: 30});
        let material2 = new ThreeJS.MeshBasicMaterial({color: 0xb2b1af});
        let wall2 = new ThreeJS.Mesh(geometry2, material2);
        wall2.name = "WALL_2";
        wall2.position.set(0, 2.5, -ROOM_SCALE / 2.0);
        this.collisionManager.pushToCollidableList(wall2);
        this.scene.add(wall2);

        let geometry3 = new ThreeJS.BoxGeometry(1, 7, ROOM_SCALE);
        //let material3 = new ThreeJS.MeshPhongMaterial({color: 0xb2b1af, specular: 0x555555, shininess: 30});
        let material3 = new ThreeJS.MeshBasicMaterial({color: 0xb2b1af});
        let wall3 = new ThreeJS.Mesh(geometry3, material3);
        wall3.name = "WALL_3";
        wall3.position.set(ROOM_SCALE / 2.0, 2.5, 0);
        this.collisionManager.pushToCollidableList(wall3);
        this.scene.add(wall3);

        let geometry4 = new ThreeJS.BoxGeometry(1, 7, ROOM_SCALE);
        //let material4 = new ThreeJS.MeshPhongMaterial({color: 0xb2b1af, specular: 0x555555, shininess: 30});
        let material4 = new ThreeJS.MeshBasicMaterial({color: 0xb2b1af});
        let wall4 = new ThreeJS.Mesh(geometry4, material4);
        wall4.name = "WALL_4";
        wall4.position.set(-ROOM_SCALE / 2.0, 2.5, 0);
        this.collisionManager.pushToCollidableList(wall4);
        this.scene.add(wall4);
    }

    update(input) {
        // First update player
        this.player.update(input);

        // Update rest of models in world state
        // ...
    }
}

module.exports = ModelManager;