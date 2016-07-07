import PointerLockController from './PointerLockController.es6';

class MouseInputController {
    constructor() {
        this.pointerLockController = new PointerLockController({mouseMoveHandler: (moveX, moveY) => this.mouseMoveHandler(moveX, moveY)});
        this.currentValueInQueue = {MOUSE_X: 0, MOUSE_Y: 0};
    }

    mouseMoveHandler(moveX, moveY) {
        this.currentValueInQueue = {MOUSE_X: moveX, MOUSE_Y: moveY}
    }

    getCurrentValueInQueue() {
        return this.currentValueInQueue;
    }

    listenForInputs() {
        this.pointerLockController.attach();
    }

}

module.exports = MouseInputController;

