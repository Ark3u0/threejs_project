class KeyboardInputController {
    constructor() {
        this.currentValueInQueue = undefined;
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
        this.currentValueInQueue = undefined;
    }

    keydownHandler(keyboardEvent) {
        this.currentValueInQueue = this._getKeyMapping(keyboardEvent.keyCode);
    }
}

module.exports = KeyboardInputController;
