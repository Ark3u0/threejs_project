import ThreeJS from 'three';
import KeyboardInputController from './InputControllers/KeyboardInputController.es6';
import MouseInputController from './InputControllers/MouseInputController.es6';

class Application {
    constructor() {
        this.scene = new ThreeJS.Scene();
        this.camera = new ThreeJS.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        this.renderer = new ThreeJS.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xffffff, 1.0);

        this.keyboardInputController = new KeyboardInputController();
        this.keyboardInputController.listenForInputs();

        this.mouseInputController = new MouseInputController();
        this.mouseInputController.listenForInputs();

        document.body.appendChild(this.renderer.domElement);
        this.addCubeToScene();
    }

    addCubeToScene() {
        let geometry = new ThreeJS.BoxGeometry(1, 1, 1);
        let material = new ThreeJS.MeshBasicMaterial({
           color: 0x00ff00
        });
        this.cube = new ThreeJS.Mesh(geometry, material);
        this.scene.add(this.cube);
    }

    render() {
        requestAnimationFrame(() => this.render());

        console.log(this.mouseInputController.getCurrentValueInQueue());
        console.log(this.keyboardInputController.getCurrentKeyInQueue());

        this.cube.rotation.x += 0.1;
        this.cube.rotation.y += 0.1;

        this.renderer.render(this.scene, this.camera);
    }

    start() {
        this.camera.position.z = 5;
        this.render();
    }
}

module.exports = Application;