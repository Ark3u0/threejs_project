import ThreeJS from 'three';
import GameEngine from './GameEngine.es6';

const CLOCK_INTERVAL = 1000 / 60; // TARGET 60 FPS

class Application {
    constructor() {
        this.scene = new ThreeJS.Scene();
        this.camera = new ThreeJS.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 1000);
        this.renderer = new ThreeJS.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0, 1.0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = ThreeJS.PCFSoftShadowMap;
        this.renderer.gammaInput = true;
        this.renderer.gammaOutput = true;

        this.game = new GameEngine({scene: this.scene, camera: this.camera});

        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => this.onResize(), false);
    }

    onResize() {
        this.camera.aspect = window.innerHeight / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render(timeStamp) {
        requestAnimationFrame((ts) => this.render(ts));

        let timeElapsed = timeStamp - this.lastTimeStamp;

        if (timeElapsed > CLOCK_INTERVAL) {
            this.lastTimeStamp = timeStamp - (timeElapsed % CLOCK_INTERVAL);
            this.game.loop(timeElapsed, this.scene, this.camera);
            this.renderer.render(this.scene, this.camera);
        }
    }

    start() {
        this.lastTimeStamp = 0;
        requestAnimationFrame((ts) => this.render(ts));
    }
}

module.exports = Application;