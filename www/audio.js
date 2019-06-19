// @ts-check
import { CitySynth } from "wasm-game-of-life";

export class JsSynth {

    // /** @type {number} */
    // bufferLength = null;

    // /** @type {CitySynth} */
    // synth = null;

    // /** @type {Float64Array} */
    // buffer = null;

    constructor() {
        const synth = CitySynth.new();
        if (this.synth) {
            this.dispose();
        }
        this.synth = synth;
        this.bufferLength = 128;
        this.buffer = new Float64Array(this.bufferLength);
    }

    read() {
        if (this.buffer) {
            this.synth.read(this.buffer);
        } else {
            console.error("cannot read as synth is not initialised");
        }
    }

    noteOn() {
        this.synth.note_on();
    }

    noteOff() {
        this.synth.note_off();
    }

    dispose() {
        if (this.synth) {
            // this.synth.free();
        }
        // this.synth = null;
    }
}