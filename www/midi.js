// @ts-check

const Keys = {
    Modifiers: -65536,
    None: 0,
    LButton: 1,
    RButton: 2,
    Cancel: 3,
    MButton: 4,
    XButton1: 5,
    XButton2: 6,
    Back: 8,
    Tab: 9,
    LineFeed: 10,
    Clear: 12,
    Return: 13,
    Enter: 13,
    ShiftKey: 16,
    ControlKey: 17,
    Menu: 18,
    Pause: 19,
    Capital: 20,
    CapsLock: 20,
    KanaMode: 21,
    HanguelMode: 21,
    HangulMode: 21,
    JunjaMode: 23,
    FinalMode: 24,
    HanjaMode: 25,
    KanjiMode: 25,
    Escape: 27,
    IMEConvert: 28,
    IMENonconvert: 29,
    IMEAccept: 30,
    IMEAceept: 30,
    IMEModeChange: 31,
    Space: 32,
    Prior: 33,
    PageUp: 33,
    Next: 34,
    PageDown: 34,
    End: 35,
    Home: 36,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Select: 41,
    Print: 42,
    Execute: 43,
    Snapshot: 44,
    PrintScreen: 44,
    Insert: 45,
    Delete: 46,
    Help: 47,
    D0: 48,
    D1: 49,
    D2: 50,
    D3: 51,
    D4: 52,
    D5: 53,
    D6: 54,
    D7: 55,
    D8: 56,
    D9: 57,
    A: 65,
    B: 66,
    C: 67,
    D: 68,
    E: 69,
    F: 70,
    G: 71,
    H: 72,
    I: 73,
    J: 74,
    K: 75,
    L: 76,
    M: 77,
    N: 78,
    O: 79,
    P: 80,
    Q: 81,
    R: 82,
    S: 83,
    T: 84,
    U: 85,
    V: 86,
    W: 87,
    X: 88,
    Y: 89,
    Z: 90,
    LWin: 91,
    RWin: 92,
    Apps: 93,
    Sleep: 95,
    NumPad0: 96,
    NumPad1: 97,
    NumPad2: 98,
    NumPad3: 99,
    NumPad4: 100,
    NumPad5: 101,
    NumPad6: 102,
    NumPad7: 103,
    NumPad8: 104,
    NumPad9: 105,
    Multiply: 106,
    Add: 107,
    Separator: 108,
    Subtract: 109,
    Decimal: 110,
    Divide: 111,
    F1: 112,
    F2: 113,
    F3: 114,
    F4: 115,
    F5: 116,
    F6: 117,
    F7: 118,
    F8: 119,
    F9: 120,
    F10: 121,
    F11: 122,
    F12: 123,
    F13: 124,
    F14: 125,
    F15: 126,
    F16: 127,
    F17: 128,
    F18: 129,
    F19: 130,
    F20: 131,
    F21: 132,
    F22: 133,
    F23: 134,
    F24: 135,
    NumLock: 144,
    Scroll: 145,
    LShiftKey: 160,
    RShiftKey: 161,
    LControlKey: 162,
    RControlKey: 163,
    LMenu: 164,
    RMenu: 165,
    BrowserBack: 166,
    BrowserForward: 167,
    BrowserRefresh: 168,
    BrowserStop: 169,
    BrowserSearch: 170,
    BrowserFavorites: 171,
    BrowserHome: 172,
    VolumeMute: 173,
    VolumeDown: 174,
    VolumeUp: 175,
    MediaNextTrack: 176,
    MediaPreviousTrack: 177,
    MediaStop: 178,
    MediaPlayPause: 179,
    LaunchMail: 180,
    SelectMedia: 181,
    LaunchApplication1: 182,
    LaunchApplication2: 183,
    OemSemicolon: 186,
    Oem1: 186,
    Oemplus: 187,
    Oemcomma: 188,
    OemMinus: 189,
    OemPeriod: 190,
    OemQuestion: 191,
    Oem2: 191,
    Oemtilde: 192,
    Oem3: 192,
    OemOpenBrackets: 219,
    Oem4: 219,
    OemPipe: 220,
    Oem5: 220,
    OemCloseBrackets: 221,
    Oem6: 221,
    OemQuotes: 222,
    Oem7: 222,
    Oem8: 223,
    OemBackslash: 226,
    Oem102: 226,
    ProcessKey: 229,
    Packet: 231,
    Attn: 246,
    Crsel: 247,
    Exsel: 248,
    EraseEof: 249,
    Play: 250,
    Zoom: 251,
    NoName: 252,
    Pa1: 253,
    OemClear: 254,
    KeyCode: 65535,
    Shift: 65536,
    Control: 131072,
    Alt: 262144
}

/**
 * @param {number} keyCode
 */
function keyCodeToSemitoneOffset(keyCode) {
    let st = null;
    switch (keyCode) {
        //Keyboard Keys
        case Keys.Q:
            st = -1;
            break;
        case Keys.A:
            st = 0;
            break;
        case Keys.W:
            st = 1;
            break;
        case Keys.S:
            st = 2;
            break;
        case Keys.E:
            st = 3;
            break;
        case Keys.D:
            st = 4;
            break;
        case Keys.F:
            st = 5;
            break;
        case Keys.T:
            st = 6;
            break;
        case Keys.G:
            st = 7;
            break;
        case Keys.Y:
            st = 8;
            break;
        case Keys.H:
            st = 9;
            break;
        case Keys.U:
            st = 10;
            break;
        case Keys.J:
            st = 11;
            break;
        case Keys.K:
            st = 12;
            break;
        case Keys.O:
            st = 13;
            break;
        case Keys.L:
            st = 14;
            break;
        case Keys.P:
            st = 15;
            break;
        case Keys.OemSemicolon:
            st = 16;
            break;
        case Keys.Oemtilde:
            st = 17;
            break;
    }
    return st;
}

/**
 * @param {number} semitoneOffset
 */
function a4OffsetSemitonesToFreq(semitoneOffset) {
    const oct = (semitoneOffset || 0.0) / 12.0;
    const factor = Math.pow(2.0, oct);
    return factor * 440.0;
}

class MessageQueue {
    /** @type {any[]} */
    queue = [];

    /**
     * @param {any} obj
     */
    enqueue(obj) {
        this.queue.push(obj);
    }

    /**
     * @returns {any}
     */
    dequeue() {
        return this.queue.unshift();
    }
}

const MessageEvent = {
    NoteOn: 0,
    NoteOff: 1,
}

class KeyEventHandler {
    /** @type {{ keyCode: number; }[]} */
    _keyStack = [];
    /** @type {{ keyCode: number; }[]} */
    _boundedSet = [];
    /** @type {MessageQueue} */
    _msgQueue = null;

    _maxCount = 0;

    /**
     * @param {MessageQueue} msgQueue
     * @param {number} maxCount
     */
    constructor(msgQueue, maxCount) {
        this._msgQueue = msgQueue;
        this._maxCount = maxCount || 1;
    }

    /**
     * @param {KeyboardEvent} event
     */
    onKeyDown(event) {
        const keyCode = event.which;
        if (!this._keyStack.find(key => key.keyCode == keyCode)) {
            // const semitoneOffset = keyCodeToSemitoneOffset(keyCode)
            this._keyStack.push({ keyCode });
        }
    }

    /**
     * @param {KeyboardEvent} event
     */
    onKeyUp(event) {
        const keyCode = event.which;
        const matchIdx = this._keyStack.findIndex(key => key.keyCode == keyCode);
        if (matchIdx == this._keyStack.length - 1) {
            this._keyStack.pop();
        } else if (matchIdx != -1) {
            this._keyStack.splice(matchIdx, 1);
        }
    }

    fireChangeEvents() {
        const newSet = [];
        const startIdx = Math.max(0, this._keyStack.length - 5);
        for (var i = startIdx; i < this._keyStack.length; i++) {
            newSet.push(this._keyStack[i]);
        }

        const oldSet = [...this._boundedSet];
        this._boundedSet = [];
        oldSet.forEach(key => {
            const newIdx = newSet.indexOf(key);
            if (newIdx >= 0) {
                newSet.splice(newIdx, 1);
                this._boundedSet.push(key);
            } else {
                this._msgQueue.enqueue({ type: MessageEvent.NoteOff, key: key });
            }
        });
        newSet.forEach(key => {
            this._msgQueue.enqueue({ type: MessageEvent.NoteOn, key: key });
            this._boundedSet.push(key);
        });
    }
}


class VoiceScheduler {
    /** @type {{ type: string; freq: number; iden: number; active: boolean; voice: () => { _state: any, noteOn: () => void; noteOff: () => void; isRunning: () => boolean, setFreq: (freq: number) => void }; }[]} */
    _voicePool = [];
    /** @type {MessageQueue} */
    _msgQueue = null;
    _maxCount = 0;

    /**
     * @param {MessageQueue} msgQueue
     * @param {number} maxCount
     */
    constructor(msgQueue, maxCount) {
        this._msgQueue = msgQueue;
        this._maxCount = maxCount || 1;
        for (var i = 0; i < this._maxCount; i++) {
            this._voicePool.push({
                type: "voice",
                freq: 440.0,
                iden: -1,
                active: false,
                voice: function () {
                    var _state = { on: false, freq: 440.0 };
                    return ({
                        _state,
                        noteOn: () => _state.on = true,
                        noteOff: () => _state.on = false,
                        isRunning: () => _state.on,
                        setFreq: (freq) => _state.freq = freq
                    });
                }
            });
        }
    }

    processUpdates() {
        let keyMsg = this._msgQueue.dequeue();

        do {
            switch (keyMsg.type) {
                case MessageEvent.NoteOn:
                    this.processNoteOn(keyMsg);
                    break;
                case MessageEvent.NoteOff:
                    this.processNoteOff(keyMsg);
                    break;
            }

            keyMsg = this._msgQueue.dequeue();
        } while (keyMsg)
    }

    /**
     * @param {any} keyMsg
     */
    processNoteOn(keyMsg) {
        const availableVoice = this.getUnusedVoice();
        if (availableVoice) {
            VoiceScheduler.applyKeyToVoice(availableVoice, keyMsg);
            availableVoice.voice().noteOn();
        } else {
            console.warn(`no free voice available to process note on event: ${JSON.stringify(keyMsg)}`);
        }
    }

    /**
     * @param {{ key: { keyCode: number; }; }} keyMsg
     */
    processNoteOff(keyMsg) {
        const activeVoice = this._voicePool.find(voiceItem => keyMsg.key.keyCode == voiceItem.iden);
        if (activeVoice) {
            activeVoice.voice().noteOff();
            activeVoice.active = false;
        } else {
            console.warn(`no active voice found to process note off event: ${JSON.stringify(keyMsg)}`);
        }
    }

    getUnusedVoice() {
        let unusedVoice = null;
        for (var voiceItem of this._voicePool) {
            if (!voiceItem.active) {
                if (voiceItem.voice().isRunning()) {
                    unusedVoice = voiceItem;
                } else {
                    return voiceItem;
                }
            }
        }
        return unusedVoice;
    }

    /**
     * @param {{ type: string; freq: number; iden: number; active: boolean; voice: () => { _state: any, noteOn: () => void; noteOff: () => void; isRunning: () => boolean, setFreq: (freq: number) => void }; }} voiceItem
     * @param {any} keyMsg
     */
    static applyKeyToVoice(voiceItem, keyMsg) {
        voiceItem.active = true;
        voiceItem.iden = keyMsg.key.keyCode;
        const semitones = keyCodeToSemitoneOffset(keyMsg.key.keyCode);
        const freq = a4OffsetSemitonesToFreq(semitones);
        voiceItem.freq = freq;
        voiceItem.voice().setFreq(freq);
    }
}

export class VoiceManager {
    /** @type {MessageQueue} */
    msgQueue = null;
    /** @type {VoiceScheduler} */
    scheduler = null;
    /** @type {KeyEventHandler} */
    eventHandler = null;

    /**
     * @param {number} maxVoicesCount
     */
    constructor(maxVoicesCount) {
        this.msgQueue = new MessageQueue();
        this.scheduler = new VoiceScheduler(this.msgQueue, maxVoicesCount);
        this.eventHandler = new KeyEventHandler(this.msgQueue, maxVoicesCount);
    }

    schedulerInstance() {
        return this.scheduler;
    }

    eventHandlerInstance() {
        return this.eventHandler;
    }
}