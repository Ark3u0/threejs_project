import ThreeJS from 'three';

const PENUMBRA = 1;
const DECAY = 2;
const INTENSITY = 1;
const COLOR = 0xffffff;
const ANGLE = Math.PI / 4;

const TARGET_VISIBLE = false;

class LightManager {
    constructor(options) {
        this.scene = options.scene;
    }

    initializeDirectionalLightInScene() {
        let directionalLight = new ThreeJS.DirectionalLight(COLOR);
        directionalLight.intensity = 0.2;
        directionalLight.position.set(10, 20, 10);
        this.scene.add(directionalLight);
    }

    initializeAmbientLightInScene() {
        let ambientLight = new ThreeJS.AmbientLight(COLOR);
        ambientLight.intensity = 0.05;
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
        this.scene.add(spotLight);
        this.scene.add(spotLight.target);
    }

    initializeSpotlightsInScene() {
        // SCREEN 1
        this.createSpotLight({x: -1.3, y: 8, z: 8.9}, {x: -1.3, y: 5, z: 7.6});

        // SCREEN 2
        this.createSpotLight({x: 3.8, y: 8, z: 4.2}, {x: 2.3, y: 5, z: 4.2});

        // SCREEN 3
        this.createSpotLight({x: -1.3, y: 8, z: 2}, {x: -1.3, y: 5, z: 0.64});

        // SCREEN 4
        this.createSpotLight({x: -6.4, y: 8, z: -3.2}, {x: -5.05, y: 5, z: -3.2});

        //// SCREEN 5
        this.createSpotLight({x: -1.3, y: 8, z: -5}, {x: -1.3, y: 5, z: -6.4});

    }
}

module.exports = LightManager;