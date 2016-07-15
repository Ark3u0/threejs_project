import ThreeJS from 'three';

/*
 * Written with reference to:
 *  - http://threejs.org/examples/misc_controls_pointerlock.html
 */

const INVERT_VERTICAL = true;
const VERTICAL_ANGLE_BOUND = 60.0;
const MOUSE_SENSITIVITY_X = 0.001;
const MOUSE_SENSITIVITY_Y = 0.001;
const VELOCITY = 0.1;
const NO_MOTION_DELTA = 0.5;

class Player {
    constructor(options) {
        this.camera = options.camera;
        this.scene = options.scene;
        this.collisionManager = options.collisionManager;
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
        let collisionNormals = this.collisionManager.getCollisionNormals(this.playerTarget);
        this.updateByTranslation(input, collisionNormals);
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

    updateByTranslation(input, collisionNormals) {
        const strafe_right = input.KEY_RIGHT ? 1 : 0;
        const strafe_left = input.KEY_LEFT ? -1 : 0;
        const forward = input.KEY_UP ? -1 : 0;
        const backward = input.KEY_DOWN ? 1 : 0;

        let forwardVector = new ThreeJS.Vector3().copy(this.playerTarget.getWorldDirection());
        let sidewaysVector = new ThreeJS.Vector3().copy(forwardVector).applyEuler(new ThreeJS.Euler(0, Math.PI / 2, 0, "YXZ"));

        const velocityForward = (input.KEY_UP || input.KEY_DOWN) ? (forward + backward) : 0;
        const velocitySideways = (input.KEY_RIGHT || input.KEY_LEFT) ? (strafe_right + strafe_left) : 0;

        // Mutate Velocity of vector to be 1, -1, or 0 on given axis
        sidewaysVector.multiplyScalar(velocitySideways);
        forwardVector.multiplyScalar(velocityForward);


        let translationVector = new ThreeJS.Vector3(sidewaysVector.x + forwardVector.x, 0, sidewaysVector.z + forwardVector.z);
        let reductionVector = new ThreeJS.Vector3(0, 0, 0);

        // Now we apply collision considerations
        // First we only apply normals for which dot product is < 0 (opposing directions)
        collisionNormals.forEach((normal) => {
            if (translationVector.dot(normal) < 0) {
                reductionVector.add(normal);
            }
        });

        reductionVector.normalize();
        translationVector.normalize();

        let finalTranslation = new ThreeJS.Vector3(this.zeroIfInDelta(translationVector.x + reductionVector.x),
          0,
          this.zeroIfInDelta(translationVector.z + reductionVector.z));

        console.log(finalTranslation);

        this.playerTarget.position.x = this.playerTarget.position.x + (finalTranslation.x * VELOCITY);
        this.playerTarget.position.z = this.playerTarget.position.z + (finalTranslation.z * VELOCITY);
    }

    zeroIfInDelta(value) {
        return (value < NO_MOTION_DELTA && value > -NO_MOTION_DELTA) ? 0 : value;
    }
}

module.exports = Player;