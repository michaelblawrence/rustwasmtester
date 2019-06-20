// @ts-check
import { CitySynth } from "wasm-game-of-life";

// @ts-ignore
window.interval = 300;

export class JsSynth {

    constructor() {
        this.active = false;
        this.freq = 440.0;
        
        this.synth = CitySynth.new();
        this.synth.set_freq(this.freq);

        this.bufferLength = 2048;
        this.buffer = new Float64Array(this.bufferLength);
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
            this.synth.set_freq(this.freq);
            
            this.customWaveform.onaudioprocess = audioProcessingEvent => {
                const outputBuffer = audioProcessingEvent.outputBuffer;
                const outputData = outputBuffer.getChannelData(0);
                this.read();
                for (var sample = 0; sample < outputData.length; sample++) {
                    outputData[sample] = this.buffer[sample];
                }
            }
            this.customWaveform.connect(this.audioContext.destination);
            let noteActive = false;
            this.noteToggleTimer = setInterval(() => {
                if (noteActive) {
                    this.noteOff();
                } else {
                    this.noteOn();
                }
                noteActive = !noteActive;
            }, interval);
        }
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
