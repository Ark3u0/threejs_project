import MouseInputController from './MouseInputController.es6';
import KeyboardInputController from './KeyboardInputController.es6';
import PointerLockController from './PointerLockController.es6';

class InputController {
    constructor() {
        this.pointerLockController = new PointerLockController();
        this.mouseInputController = new MouseInputController({pointerLockController: this.pointerLockController});
        this.keyboardInputController = new KeyboardInputController();
    }

    getCurrentInputInQueue() {
        if (!this.pointerLockController.isLocked()) {
            return Object.assign({}, this.mouseInputController.getZeroQueue(), this.keyboardInputController.getZeroQueue());
        }
        return Object.assign({}, this.mouseInputController.getCurrentValueInQueue(), this.keyboardInputController.getCurrentKeyInQueue());
    }

    listenForInputs() {
        this.mouseInputController.listenForInputs();
        this.keyboardInputController.listenForInputs();
    }
}

module.exports = InputController;