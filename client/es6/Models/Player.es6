import ThreeJS from 'three';

/*
 * Written with reference to:
 *  - http://threejs.org/examples/misc_controls_pointerlock.html
 */

const PI_2 = Math.PI / 2;
const CLAMP_ROTATION = true;
const INVERT_VERTICAL = true;
const MOUSE_SENSITIVITY_X = 0.001;
const MOUSE_SENSITIVITY_Y = 0.001;


class Player {
    constructor(options) {
        this.playerObject = new ThreeJS.Object3D();
        this.playerObject.add(options.camera);

        this.playerObject.position.x = 0;
        this.playerObject.position.y = 3;
        this.playerObject.position.z = 1;

        options.scene.add(this.playerObject);
    }

    update(input, camera) {
        this.updateByTranslation(input, camera);
        this.updateByRotation(input, camera);
    }

    updateByRotation(input, camera) {
        let inverseY = INVERT_VERTICAL ? -1 : 1;
        let euler = new ThreeJS.Euler(inverseY * input.MOUSE_Y * MOUSE_SENSITIVITY_Y, -input.MOUSE_X * MOUSE_SENSITIVITY_X, 0);
        let quaternion = new ThreeJS.Quaternion().setFromEuler(euler);
        this.playerObject.quaternion.multiply(quaternion);

        if (CLAMP_ROTATION) {
            this.applyClampToRotation();
        }
    }

    applyClampToRotation() {

    }

    updateByTranslation(input, camera) {
        const strafe_right = input.KEY_RIGHT ? 1 : 0;
        const strafe_left = input.KEY_LEFT ? -1 : 0;
        const forward = input.KEY_UP ? -1 : 0;
        const backward = input.KEY_DOWN ? 1 : 0;

        const velocity_x = (input.KEY_RIGHT || input.KEY_LEFT) ? (strafe_right + strafe_left) * 0.1 : 0;
        const velocity_y = (input.KEY_UP || input.KEY_DOWN) ? (forward + backward) * 0.1 : 0;

        this.playerObject.translateX(velocity_x);
        this.playerObject.translateZ(velocity_y);
    }


}

module.exports = Player;