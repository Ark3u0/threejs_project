import ThreeJS from 'three';

/*
 * Written with reference to:
 *  - http://threejs.org/examples/misc_controls_pointerlock.html
 */

const INVERT_VERTICAL = true;
const SMOOTHING = true;
const VERTICAL_ANGLE_BOUND = 60.0;
const MOUSE_SENSITIVITY_X = 0.001;
const MOUSE_SENSITIVITY_Y = 0.001;

class Player {
    constructor(options) {
        this.camera = options.camera;
        this.scene = options.scene;
        this.camera.rotation.set(0, 0, 0);

        this.playerTarget = new ThreeJS.Object3D();
        this.cameraTarget = new ThreeJS.Object3D();
        this.playerTarget.name = "PLAYER_TARGET";
        this.cameraTarget.name = "CAMERA_TARGET";

        this.cameraTarget.add(this.camera);
        this.playerTarget.add(this.cameraTarget);

        this.scene.add(this.playerTarget);

        this.cameraTarget.position.x = 0;
        this.cameraTarget.position.y = 0;
        this.cameraTarget.position.z = 0;
        this.playerTarget.position.x = 0;
        this.playerTarget.position.y = 4;
        this.playerTarget.position.z = 2;
    }

    update(input) {
        this.updateByTranslation(input);
        this.updateByRotation(input);
    }

    updateByRotation(input) {
        let inverseY = INVERT_VERTICAL ? -1 : 1;
        let eulerYaw = new ThreeJS.Euler(0, -input.MOUSE_X * MOUSE_SENSITIVITY_X, 0);
        let eulerPitch = new ThreeJS.Euler(inverseY * input.MOUSE_Y * MOUSE_SENSITIVITY_Y, 0, 0);

        this.playerTarget.quaternion.multiply(new ThreeJS.Quaternion().setFromEuler(eulerYaw));
        this.cameraTarget.quaternion.multiply(new ThreeJS.Quaternion().setFromEuler(eulerPitch));

        this.applyClampToRotation(this.cameraTarget.quaternion);
    }

    applyClampToRotation(quaternion) {
        quaternion.x /= quaternion.w;
        quaternion.y /= quaternion.w;
        quaternion.z /= quaternion.w;
        quaternion.w = 1.0;

        let angleX = 2.0 * (180.0 / Math.PI) * Math.atan(quaternion.x);
        angleX = Math.max(-VERTICAL_ANGLE_BOUND, Math.min(VERTICAL_ANGLE_BOUND, angleX));
        quaternion.x = Math.tan(0.5 * (Math.PI / 180.0) * angleX);
    }

    updateByTranslation(input) {
        const strafe_right = input.KEY_RIGHT ? 1 : 0;
        const strafe_left = input.KEY_LEFT ? -1 : 0;
        const forward = input.KEY_UP ? -1 : 0;
        const backward = input.KEY_DOWN ? 1 : 0;

        const velocity_x = (input.KEY_RIGHT || input.KEY_LEFT) ? (strafe_right + strafe_left) * 0.1 : 0;
        const velocity_y = (input.KEY_UP || input.KEY_DOWN) ? (forward + backward) * 0.1 : 0;

        this.playerTarget.translateX(velocity_x);
        this.playerTarget.translateZ(velocity_y);
    }


}

module.exports = Player;