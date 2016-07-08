import ThreeJS from 'three';
import GameEngine from './GameEngine.es6';
import InputController from './InputControllers/InputController.es6';

class Application {
    constructor() {
        this.scene = new ThreeJS.Scene();
        this.camera = new ThreeJS.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new ThreeJS.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xffffff, 1.0);

        this.game = new GameEngine({scene: this.scene, camera: this.camera});

        document.body.appendChild(this.renderer.domElement);
    }

    render(timeStamp) {
        let timeElapsed = this.lastTimeStamp ? timeStamp - this.lastTimeStamp : 0;
        this.lastTimeStamp = timeStamp;

        this.game.loop(timeElapsed, this.scene, this.camera);

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame((ts) => this.render(ts));
    }

    start() {
        this.camera.position.z = 5;
        requestAnimationFrame((ts) => this.render(ts));
    }
}

module.exports = Application;