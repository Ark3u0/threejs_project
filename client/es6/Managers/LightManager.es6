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
        this.initializeSpotlightsInScene();
        this.initializeAmbientLightInScene();
    }

    initializeAmbientLightInScene() {
        let ambientLight = new ThreeJS.AmbientLight(COLOR);
        ambientLight.intensity = 0.05;
        this.scene.add(ambientLight);
    }

    initializeSpotlightsInScene() {
        // SCREEN 1
        let spotLight1 = new ThreeJS.SpotLight(COLOR, INTENSITY);

        let geometry1 = new ThreeJS.SphereGeometry(0.1, 5, 5);
        let material1 = new ThreeJS.MeshBasicMaterial({color: 0xffff00});
        material1.visible = TARGET_VISIBLE;
        let target1 = new ThreeJS.Mesh(geometry1, material1);
        target1.position.set(-1.3, 5, 7.6);
        spotLight1.target = target1;

        spotLight1.position.set(-1.3, 8, 8.9);
        spotLight1.castShadow = true;
        spotLight1.angle = ANGLE;
        spotLight1.penumbra = PENUMBRA;
        spotLight1.decay = DECAY;

        spotLight1.shadow.mapSize.width = 1024;
        spotLight1.shadow.mapSize.height = 1024;
        this.scene.add(spotLight1);
        this.scene.add(spotLight1.target);

        // SCREEN 2
        let spotLight2 = new ThreeJS.SpotLight(COLOR, INTENSITY);

        let geometry2 = new ThreeJS.SphereGeometry(0.1, 5, 5);
        let material2 = new ThreeJS.MeshBasicMaterial({color: 0xffff00});
        material2.visible = TARGET_VISIBLE;
        let target2 = new ThreeJS.Mesh(geometry2, material2);
        target2.position.set(2.3, 5, 4.2);
        spotLight2.target = target2;

        spotLight2.position.set(3.8, 8, 4.2);
        spotLight2.castShadow = true;
        spotLight2.angle = ANGLE;
        spotLight2.penumbra = PENUMBRA;
        spotLight2.decay = DECAY;

        spotLight2.shadow.mapSize.width = 1024;
        spotLight2.shadow.mapSize.height = 1024;
        this.scene.add(spotLight2);
        this.scene.add(spotLight2.target);

        // SCREEN 3
        let spotLight3 = new ThreeJS.SpotLight(COLOR, INTENSITY);

        let geometry3 = new ThreeJS.SphereGeometry(0.1, 5, 5);
        let material3 = new ThreeJS.MeshBasicMaterial({color: 0xeeee00});
        material3.visible = TARGET_VISIBLE;
        let target3 = new ThreeJS.Mesh(geometry3, material3);
        target3.position.set(-1.3, 5, 0.64);
        spotLight3.target = target3;

        spotLight3.position.set(-1.3, 8, 2);
        spotLight3.castShadow = true;
        spotLight3.angle = ANGLE;
        spotLight3.penumbra = PENUMBRA;
        spotLight3.decay = DECAY;

        spotLight3.shadow.mapSize.width = 1024;
        spotLight3.shadow.mapSize.height = 1024;
        this.scene.add(spotLight3);
        this.scene.add(spotLight3.target);

        // SCREEN 4
        let spotLight4 = new ThreeJS.SpotLight(COLOR, INTENSITY);

        let geometry4 = new ThreeJS.SphereGeometry(0.1, 5, 5);
        let material4 = new ThreeJS.MeshBasicMaterial({color: 0xeeee00});
        material4.visible = TARGET_VISIBLE;
        let target4 = new ThreeJS.Mesh(geometry4, material4);
        target4.position.set(-5.05, 5, -3.2);
        spotLight4.target = target4;

        spotLight4.position.set(-6.4, 8, -3.2);
        spotLight4.castShadow = true;
        spotLight4.angle = ANGLE;
        spotLight4.penumbra = PENUMBRA;
        spotLight4.decay = DECAY;

        spotLight4.shadow.mapSize.width = 1024;
        spotLight4.shadow.mapSize.height = 1024;
        this.scene.add(spotLight4);
        this.scene.add(spotLight4.target);

        //// SCREEN 5
        let spotLight5 = new ThreeJS.SpotLight(COLOR, INTENSITY);

        let geometry5 = new ThreeJS.SphereGeometry(0.1, 5, 5);
        let material5 = new ThreeJS.MeshBasicMaterial({color: 0xeeee00});
        material5.visible = TARGET_VISIBLE;
        let target5 = new ThreeJS.Mesh(geometry5, material5);
        target5.position.set(-1.3, 5, -6.4);
        spotLight5.target = target5;

        spotLight5.position.set(-1.3, 8, -5);
        spotLight5.castShadow = true;
        spotLight5.angle = ANGLE;
        spotLight5.penumbra = PENUMBRA;
        spotLight5.decay = DECAY;

        spotLight5.shadow.mapSize.width = 1024;
        spotLight5.shadow.mapSize.height = 1024;
        this.scene.add(spotLight5);
        this.scene.add(spotLight5.target);
    }
}

module.exports = LightManager;