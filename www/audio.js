// @ts-check
import { CitySynth, Param } from "wasm-game-of-life";

// @ts-ignore
window.interval = 200;
// @ts-ignore
window.R = Param;
// @ts-ignore
window.synth = null;
// @ts-ignore
window.getAll = () => console.table(
    Object.keys(R).reduce(
        // @ts-ignore
        (acc, k, i) => {acc[k] = window.synth.get_state(i); return acc;},
        {}
    )
);

export class JsSynth {
    get freq() {
        return this._freq;
    }
    set freq(value) {
        this._freq = value;
        this.synth.set_freq(value)
    }

    constructor() {
        this.active = false;
        
        this.synth = CitySynth.new();
        this.freq = 440.0;
        // @ts-ignore
        window.synth = this.synth;

        this.bufferLength = 2048;
        this.buffer = new Float32Array(this.bufferLength);
    }

    initAudio() {
        this.audioContext = this.getWindowAudioContext();
        this.customWaveform = this.audioContext.createScriptProcessor(this.bufferLength, 0, 1);
    }

    getWindowAudioContext() {
        // @ts-ignore
        window.AudioContext = window.AudioContext||window.webkitAudioContext;
        return new AudioContext();
    }

    play() {
        if (this.audioContext === undefined) {
            this.initAudio();
        }

        const connected = !!this.noteToggleTimer;
        if (connected) {
            this.cancelPlayTimer();
            this.customWaveform.disconnect(this.audioContext.destination);
        } else {
            this.freq = 440.0;
            
            this.customWaveform.addEventListener("audioprocess", this.onAudioProcess.bind(this));
            this.customWaveform.connect(this.audioContext.destination);
            this.startPeriodicNotes();
        }
    }

    startPeriodicNotes() {
        let noteActive = false;
        this.noteToggleTimer = setInterval(
            () => {
                if (noteActive) {
                    this.noteOff();
                }
                else {
                    this.noteOn();
                }
                noteActive = !noteActive;
            },
            // @ts-ignore
            interval);
    }

    /**
     * @param {AudioProcessingEvent} audioProcessingEvent
     */
    onAudioProcess(audioProcessingEvent) {
        const outputBuffer = audioProcessingEvent.outputBuffer;
        this.read();
        outputBuffer.copyToChannel(this.buffer, 0);
    }

    cancelPlayTimer() {
        if (this.noteToggleTimer) {
            clearInterval(this.noteToggleTimer);
            this.noteOff();
            this.noteToggleTimer = null;
        }
    }

    read() {
        if (this.buffer) {
            this.synth.read(this.buffer);
        } else {
            console.error("cannot read as synth is not initialised");
        }
    }

    noteOn() {
        this.active = true;
        this.synth.note_on();
    }

    noteOff() {
        this.active = false;
        this.synth.note_off();
    }

    toggle() {
        this.active ? this.noteOff() : this.noteOn();
    }

    /**
     * @param {number} semitones
     */
    incrFrequency(semitones) {
        console.log({semitones});
        console.log({before: this.freq});

        const oct = semitones !== undefined
            ? semitones / 12.0
            : 1.0 / 12.0;
        console.log({oct});     

        const factor = Math.pow(2, oct);
        console.log({factor});     

        this.freq = this.freq * factor;
        console.log({after: this.freq});

        this.synth.set_freq(this.freq);
    }

    dispose() {
        if (this.synth) {
            this.synth.free();
        }
        this.synth = null;
    }
}
