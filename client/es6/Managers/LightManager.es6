import ThreeJS from 'three';

const PENUMBRA = 1;
const DECAY = 2;
const INTENSITY = 1;
const COLOR = 0xffffff;
const ANGLE = Math.PI / 4;

const TARGET_VISIBLE = true;

class LightManager {
    constructor(options) {
        this.scene = options.scene;
    }

    initializeAmbientLightInScene() {
        let ambientLight = new ThreeJS.AmbientLight(COLOR);
        ambientLight.intensity = 0.01;
        this.scene.add(ambientLight);
    }

    createSpotLight(spotLightPosition, targetPosition) {
        let spotLight = new ThreeJS.SpotLight(COLOR, INTENSITY);

        let geometry = new ThreeJS.SphereGeometry(0.1, 5, 5);
        let material = new ThreeJS.MeshBasicMaterial({color: 0xffff00});
        material.visible = TARGET_VISIBLE;
        let target = new ThreeJS.Mesh(geometry, material);
        target.position.set(targetPosition.x, targetPosition.y, targetPosition.z);
        spotLight.target = target;

        spotLight.position.set(spotLightPosition.x, spotLightPosition.y, spotLightPosition.z);
        spotLight.castShadow = true;
        spotLight.angle = ANGLE;
        spotLight.penumbra = PENUMBRA;
        spotLight.decay = DECAY;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        return spotLight;
    }

    initializeSpotlightsInScene() {
        // SCREEN 1
        let spotLight1 = this.createSpotLight({x: -1.3, y: 8, z: 8.9}, {x: -1.3, y: 5, z: 7.6});
        this.scene.add(spotLight1);
        this.scene.add(spotLight1.target);

        // SCREEN 2
        let spotLight2 = this.createSpotLight({x: 3.8, y: 8, z: 4.2}, {x: 2.3, y: 5, z: 4.2});
        this.scene.add(spotLight2);
        this.scene.add(spotLight2.target);

        // SCREEN 3
        let spotLight3 = this.createSpotLight({x: -1.3, y: 8, z: 2}, {x: -1.3, y: 5, z: 0.64});
        this.scene.add(spotLight3);
        this.scene.add(spotLight3.target);

        // SCREEN 4
        let spotLight4 = this.createSpotLight({x: -6.4, y: 8, z: -3.2}, {x: -5.05, y: 5, z: -3.2});
        this.scene.add(spotLight4);
        this.scene.add(spotLight4.target);

        //// SCREEN 5
        let spotLight5 = this.createSpotLight({x: -1.3, y: 8, z: -5}, {x: -1.3, y: 5, z: -6.4});
        this.scene.add(spotLight5);
        this.scene.add(spotLight5.target);
    }
}

module.exports = LightManager;