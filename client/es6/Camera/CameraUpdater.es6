import ThreeJS from 'three';

class CameraUpdater {
    constructor(options) {
        this.camera = options.camera;
    }

    //rotate(movement) {
    //    let euler = new ThreeJS.Euler(0, 0, 0, 'YXZ');
    //    euler.x = movement.rotationX;
    //    euler.y = movement.rotationY;
    //    this.camera.quaternion.setFromEuler(euler);
    //}
    //
    //translate(movement) {
    //    let euler = new
    //}
}

module.exports = CameraUpdater;