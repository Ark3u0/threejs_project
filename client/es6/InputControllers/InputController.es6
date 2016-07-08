import MouseInputController from './MouseInputController.es6';
import KeyboardInputController from './KeyboardInputController.es6';

class InputController {
    constructor() {
        this.mouseInputController = new MouseInputController();
        this.keyboardInputController = new KeyboardInputController();
    }

    getCurrentInputInQueue() {
        return Object.assign({}, this.mouseInputController.getCurrentValueInQueue(), this.keyboardInputController.getCurrentKeyInQueue());
    }

    listenForInputs() {
        this.mouseInputController.listenForInputs();
        this.keyboardInputController.listenForInputs();
    }
}

module.exports = InputController;