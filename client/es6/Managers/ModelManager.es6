import ThreeJS from 'three';
import Player from '../Player/Player.es6';
import CollisionDetector from './../Player/CollisionDetector.es6';

const ROOM_SCALE = 30;

class ModelManager {
    constructor(options) {
        this.objectLoader = new ThreeJS.ObjectLoader();
        this.modelsToLoad = ["popUpProjection"];
        this.loadCounter = this.modelsToLoad.length;
        this.modelCollection = {};

        this.textureManager = options.textureManager;
        this.collisionManager = new CollisionDetector();
        this.player = new Player({scene: options.scene, camera: options.camera, collisionManager: this.collisionManager});
        this.scene = options.scene;
    }

    getModel(modelName) {
        return this.modelCollection[modelName];
    }

    loadExternalModelsToMemory(callback) {
        const evaluateDone = () => {
            if (this.loadCounter === 0) {
                callback();
            }
        };

        this.modelsToLoad.forEach((modelName) => {
            this.objectLoader.load(`models/${modelName}.json`, (textureData) => {
                this.modelCollection[modelName] = textureData;
                this.loadCounter--;
                evaluateDone();
            });
        });
    }

    createScreenModelChildMaterial(child) {
        if (child.name.includes("Aluminum")) {
            return new ThreeJS.MeshPhongMaterial({
                shininess: 80,
                specular: 0x333333,
                map: this.textureManager.getTexture("aluminum")
            });
        } else if (child.name.includes("PLYWOOD")) {
            return new ThreeJS.MeshPhongMaterial({
                shininess: 10,
                specular: 0x111111,
                map: this.textureManager.getTexture("plywood")
            });
        } else if (child.name.includes("Cross_Bracing")) {
            return new ThreeJS.MeshPhongMaterial({
                shininess: 40,
                specular: 0x555555,
                map: this.textureManager.getTexture("wire")
            });
        } else {
            // This is placeholder unless actual materials are applied
            return new ThreeJS.MeshPhongMaterial({color: 0xd3d3d3, specular: 0x009900, shininess: 30, shading: ThreeJS.FlatShading});
        }
    }

    createScreenModel(object) {
        let screenModel = this.getModel("popUpProjection");
        screenModel.traverse((child) => {
            if (child instanceof ThreeJS.Mesh) {
                child.material = this.createScreenModelChildMaterial(child);
                this.collisionManager.pushToCollidableList(child);
            }
        });
        screenModel.position.set(-5, 0.5, 7.5);
        this.scene.add(screenModel);
    }

    initializeModelsInScene() {
        this.createScreenModel();
        this.createFloor();
        this.createWalls();
    }

    createFloor() {
        let geometry = new ThreeJS.BoxGeometry(ROOM_SCALE, 1, ROOM_SCALE);
        let material = new ThreeJS.MeshPhongMaterial({map: this.textureManager.getTexture("floor")});
        let floor = new ThreeJS.Mesh(geometry, material);
        floor.name = "FLOOR";
        this.collisionManager.pushToCollidableList(floor);
        this.scene.add(floor)
    }

    createWalls() {
        let geometry1 = new ThreeJS.BoxGeometry(ROOM_SCALE, 7, 1);
        let material1 = new ThreeJS.Material();
        material1.visible = false;
        let wall1 = new ThreeJS.Mesh(geometry1, material1);
        wall1.name = "WALL_1";
        wall1.position.set(0, 2.5, ROOM_SCALE / 2.0);
        this.collisionManager.pushToCollidableList(wall1);
        this.scene.add(wall1);

        let geometry2 = new ThreeJS.BoxGeometry(ROOM_SCALE, 7, 1);
        let material2 = new ThreeJS.Material();
        material2.visible = false;
        let wall2 = new ThreeJS.Mesh(geometry2, material2);
        wall2.name = "WALL_2";
        wall2.position.set(0, 2.5, -ROOM_SCALE / 2.0);
        this.collisionManager.pushToCollidableList(wall2);
        this.scene.add(wall2);

        let geometry3 = new ThreeJS.BoxGeometry(1, 7, ROOM_SCALE);
        let material3 = new ThreeJS.Material();
        material3.visible = false;
        let wall3 = new ThreeJS.Mesh(geometry3, material3);
        wall3.name = "WALL_3";
        wall3.position.set(ROOM_SCALE / 2.0, 2.5, 0);
        this.collisionManager.pushToCollidableList(wall3);
        this.scene.add(wall3);

        let geometry4 = new ThreeJS.BoxGeometry(1, 7, ROOM_SCALE);
        let material4 = new ThreeJS.Material();
        material4.visible = false;
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