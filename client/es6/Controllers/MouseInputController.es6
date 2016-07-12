
class MouseInputController {
    constructor(options) {
        this.pointerLockController = options.pointerLockController;
        this.currentValueInQueue = {MOUSE_X: 0, MOUSE_Y: 0};
        this.pointerLockController.setMouseMoveHandler((moveX, moveY) => this.mouseMoveHandler(moveX, moveY));
    }

    mouseMoveHandler(moveX, moveY) {
        this.currentValueInQueue = {MOUSE_X: moveX, MOUSE_Y: moveY}
    }

    getZeroQueue() {
        return {MOUSE_X: 0, MOUSE_Y: 0};
    }

    getCurrentValueInQueue() {
        let currentValue = this.currentValueInQueue;
        this.currentValueInQueue = this.getZeroQueue();
        return currentValue;
    }

    listenForInputs() {
        this.pointerLockController.attach();
    }
}

module.exports = MouseInputController;

