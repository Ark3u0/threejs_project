class KeyboardInputController {
    constructor() {
        this.currentValueInQueue = {
            KEY_LEFT: false,
            KEY_RIGHT: false,
            KEY_UP: false,
            KEY_DOWN: false
        };
    }

    getCurrentKeyInQueue() {
        return this.currentValueInQueue;
    }

    listenForInputs() {
        document.addEventListener('keydown', (event) => { this.keydownHandler(event)});
        document.addEventListener('keyup', (event) => { this.keyupHandler(event)});
    }

    _getKeyMapping(keyCode) {
        switch (keyCode) {
            // LEFT
            case 37:
            case 65:
              return "KEY_LEFT";
            // RIGHT
            case 39:
            case 68:
              return "KEY_RIGHT";
            // UP
            case 38:
            case 87:
              return "KEY_UP";
            // DOWN
            case 40:
            case 83:
              return "KEY_DOWN";
            default:
              return;
        }
    }

    keyupHandler(keyboardEvent) {
        let keyUp = this._getKeyMapping(keyboardEvent.keyCode);
        this.currentValueInQueue = Object.assign({}, this.currentValueInQueue, {[keyUp]: false});
    }

    keydownHandler(keyboardEvent) {
        let keyDown = this._getKeyMapping(keyboardEvent.keyCode);
        this.currentValueInQueue = Object.assign({}, this.currentValueInQueue, {[keyDown]: true});
    }
}

module.exports = KeyboardInputController;
