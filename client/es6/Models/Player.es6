import ThreeJS from 'three';

/*
 * Written with reference to:
 *  - http://threejs.org/examples/misc_controls_pointerlock.html
 */

const PI_2 = Math.PI / 2;

class Player {
    constructor(options) {
        this.camera = options.camera;
    }

    update(input, camera) {
        this.updateByTranslation(input, camera);
    }

    updateByTranslation(input,camera) {
        const strafe_right = input.KEY_RIGHT ? 1 : 0;
        const strafe_left = input.KEY_LEFT ? -1 : 0;
        const forward = input.KEY_UP ? -1 : 0;
        const backward = input.KEY_DOWN ? 1 : 0;

        const velocity_x = (input.KEY_RIGHT || input.KEY_LEFT) ? (strafe_right + strafe_left) * 0.1 : 0;
        const velocity_y = (input.KEY_UP || input.KEY_DOWN) ? (forward + backward) * 0.1 : 0;

        camera.translateX(velocity_x);
        camera.translateZ(velocity_y);
    }
}

module.exports = Player;