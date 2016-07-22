import ThreeJS from 'three';

/*
 * Built with reference to http://webmaestro.fr/collisions-detection-three-js-raycasting/
 */

const COLLISION_DISTANCE = 1.5;

class CollisionManager {
    constructor() {
        this.collidableList = [];
        this.caster = new ThreeJS.Raycaster();
    }

    pushToCollidableList(object) {
        this.collidableList.push(object);
    }

    getOutcastRays(player) {
        let currentDirectionVector = new ThreeJS.Vector3(0,0,1);

        return [
            new ThreeJS.Vector3().copy(currentDirectionVector),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 2 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 3 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 4 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 5 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 6 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 7 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, Math.PI, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 9 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 10 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 11 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 12 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 13 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 14 * Math.PI / 8, 0, "YXZ")),
            new ThreeJS.Vector3().copy(currentDirectionVector).applyEuler(new ThreeJS.Euler(0, 15 * Math.PI / 8, 0, "YXZ"))
        ];
    }

    getCollisionNormals(player) {
        let rays = this.getOutcastRays(player);
        let collisionNormals = [];
        let collisions;
        for (let i = 0; i < rays.length; i++) {
            this.caster.set(player.position, rays[i]);
            collisions = this.caster.intersectObjects(this.collidableList);
            if (collisions.length > 0 && collisions[0].distance <= COLLISION_DISTANCE) {
                let collisionNormal = collisions[0].face.normal;
                collisionNormals.push(collisionNormal);
            }
        }
        return this.removeDuplicates(collisionNormals);
    }

    removeDuplicates(normals) {
        let uniqueNormals = [];
        normals.forEach((normal) => {
           if (uniqueNormals.indexOf(normal) === -1) {
               uniqueNormals.push(normal);
           }
        });
        return uniqueNormals;
    }
}

module.exports = CollisionManager;
