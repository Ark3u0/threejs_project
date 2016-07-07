import PointerLockController from './PointerLockController.es6';

class MouseInputController {
    constructor() {
        this.pointerLockController = new PointerLockController({mouseMoveHandler: (moveX, moveY) => this.mouseMoveHandler(moveX, moveY)});
        this.currentValueInQueue = {moveX: 0, moveY: 0};
    }

    mouseMoveHandler(moveX, moveY) {
        this.currentValueInQueue = {moveX: moveX, moveY: moveY}
    }

    getCurrentValueInQueue() {
        return this.currentValueInQueue;
    }

    listenForInputs() {
        this.pointerLockController.attach();
    }

}

module.exports = MouseInputController;

