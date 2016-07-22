import ThreeJS from 'three';

class TextureManager {
    constructor() {
        this.texturesToLoad = ["aluminum", "floor", "plywood", "wire"];
        this.loadCounter = this.texturesToLoad.length;
        this.textureLoader = new ThreeJS.TextureLoader();
        this.textureCollection = {};
    }

    getTexture(textureName) {
        return this.textureCollection[textureName];
    }

    loadExternalTextureMapsToMemory(callback) {
        const evaluateDone = () => {
            if (this.loadCounter === 0) {
                callback();
            }
        };

        this.texturesToLoad.forEach((textureName) => {
            this.textureLoader.load(`images/${textureName}.jpg`, (textureData) => {
                this.textureCollection[textureName] = textureData;
                this.loadCounter--;
                evaluateDone();
            });
        });
    }


}

module.exports = TextureManager;