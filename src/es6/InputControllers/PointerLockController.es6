/*
 * Written with reference to:
 *  - www.html5rocks.com/en/tutorials/pointerlock/intro/
 *  - http://threejs.org/examples/misc_controls_pointerlock.html
 */

class PointerLockController {
    constructor(options) {
        this.enablePointerLock = 'pointerLockElement' in document ||
                              'mozPointerLockElement' in document ||
                              'webkitPointerLockElement' in document;
        this.blocker = document.getElementById("blocker");
        this.instructions = document.getElementById("instructions");
        this.mouseMoveHandler = options.mouseMoveHandler;
        if (this.enablePointerLock) {
            this.element = document.body;
        } else {
            this.instructions.innerHTML = "Your browser doesn't seem to support Pointer Lock API";
        }
    }

    changeCallback() {
        let _moveCallback = (event) => this.moveCallback(event);

        if (this.isLocked()) {
            // Attach Mouse Move listener
            this.blocker.style.display = "none";
            document.addEventListener("mousemove", _moveCallback, false);
        } else {
            // Remove Mouse Move listenr
            this.blocker.style.display = "-webkit-box";
            this.blocker.style.display = "-moz-box";
            this.blocker.style.display = "box";
            this.instructions.style.display = "";
            document.removeEventListener("mousemove", _moveCallback, false);
        }
    }

    moveCallback(event) {
        let movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        let movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        this.mouseMoveHandler(movementX, movementY);
    }

    errorCallback(event) {
        this.instructions.style.display = "";
    }

    attach() {
        let _changeCallback = (event) => this.changeCallback(event);
        let _errorCallback = (event) => this.errorCallback(event);

        document.addEventListener('pointerlockchange', _changeCallback, false);
        document.addEventListener('mozpointerlockchange', _changeCallback, false);
        document.addEventListener('webkitpointerlockchange', _changeCallback, false);

        document.addEventListener('pointerlockerror', _errorCallback, false);
        document.addEventListener('mozpointerlockerror', _errorCallback, false);
        document.addEventListener('webkitpointerlockerror', _errorCallback, false);

        this.instructions.addEventListener('click', (event) => {
            this.instructions.style.display = 'none';
            this.lock();
        }, false);
    }

    lock() {
        this.element.requestPointerLock = document.body.requestPointerLock ||
                                           document.body.mozRequestPointerLock ||
                                           document.body.webkitRequestPointerLock;
        this.element.requestPointerLock();
    }

    isLocked() {
        return document.pointerLockElement === this.element ||
             document.mozPointerLockElement == this.element ||
            document.webkitPointerLockElement == this.element;
    }
}

module.exports = PointerLockController;