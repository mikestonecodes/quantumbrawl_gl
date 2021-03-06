import {Game3D} from "../common/game.js";
import {Mesh} from "../common/mesh.js";
import {MAX_FORWARD_LIGHTS} from "../materials/light.js";
import {mat_forward_colored_gouraud} from "../materials/mat_forward_colored_gouraud.js";
import {mat_forward_colored_phong} from "../materials/mat_forward_colored_phong.js";
import {sys_camera} from "./systems/sys_camera.js";
import {sys_light} from "./systems/sys_light.js";
import {sys_render_forward} from "./systems/sys_render_forward.js";
import {sys_resize} from "./systems/sys_resize.js";
import {sys_transform} from "./systems/sys_transform.js";
import {World} from "./world.js";

export class Game extends Game3D {
    World = new World();

    MaterialColoredGouraud = mat_forward_colored_gouraud(this.Gl);
    MaterialColoredPhong = mat_forward_colored_phong(this.Gl);

    Meshes: Record<string, Mesh> = {};

    LightPositions = new Float32Array(4 * MAX_FORWARD_LIGHTS);
    LightDetails = new Float32Array(4 * MAX_FORWARD_LIGHTS);

    override FrameUpdate(delta: number) {
        sys_resize(this, delta);
        sys_camera(this, delta);

        sys_transform(this, delta);

        sys_light(this, delta);
        sys_render_forward(this, delta);
    }
}
