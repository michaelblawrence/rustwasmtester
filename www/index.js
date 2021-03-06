import { Universe, Cell } from "wasm-game-of-life";
import { memory } from "wasm-game-of-life/wasm_game_of_life_bg";

import { JsSynth } from "./audio";

const CELL_SIZE = 12; // px
const GRID_COLOR = "#04425a";
const DEAD_COLOR = "#8bc0c1";
const ALIVE_COLOR = "#04425a";

// ------------------ ------------------ ------------------ ------------------ ------------------
// ------------------ ------------------ ------------------ ------------------ ------------------

let animationHandle = { value: null };
let renderer = null;

/** @type {JsSynth} */
let synth = null;

function main() {
    const universe = Universe.new();
    const width = universe.width();
    const height = universe.height();
    
    const canvas = setupCanvas(width, height);
    const ctx = canvas.getContext('2d');
    const gameObjects = { universe };
    
    renderer = startRenderer(ctx, animationHandle, width, height, gameObjects);
    handleEvents(renderer, gameObjects);
    renderer.start();

    console.time("init synth");
    synth = new JsSynth();
    console.timeEnd("init synth");

    // benchSynthing();
}

// ------------------ ------------------ ------------------ ------------------ ------------------

function setupCanvas(width, height) {
    const canvas = document.getElementById("game-of-life-canvas");
    canvas.height = (CELL_SIZE + 1) * height + 1;
    canvas.width = (CELL_SIZE + 1) * width + 1;
    return canvas;
}

function startRenderer(ctx, handle, width, height, gameObjects) {
    function nextFrame(onlySingleFrame) {
        if (onlySingleFrame) {
            gameObjects.universe.tick();
        }

        draw();

        if (!onlySingleFrame) {
            handle.value = requestAnimationFrame(renderLoop);
        }
    }

    function draw() {
        drawGrid(ctx, width, height);
        drawCells(ctx, width, height, gameObjects.universe);
    }

    function renderLoop() {
        gameObjects.universe.tick();
        nextFrame();
    }

    function stop() {
        cancelAnimationFrame(handle.value);
        handle.value = null;
    }

    function playing() {
        return handle.value !== null;
    }

    function size() {
        return {width, height};
    }

    return {
        start: nextFrame,
        stop: stop,
        draw: draw,
        isPlaying: playing,
        size: size
    };
}

function benchSynthing() {
    console.time("synthing");
    console.log("begining...");
    readSynth();
    synth.noteOn();
    for (let i = 1; i < 60; i++) {
        readSynth();
        console.log(synth.buffer);
    }
    console.timeEnd("synthing");
    console.log("done...");
}

function readSynth() {
    console.time("synthread");
    synth.read();
    console.timeEnd("synthread");
}

function handleEvents(renderer, gameObjects) {
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("mousedown", onMouseDown);

    /**
     * @param {MouseEvent} event
     */
    function onKeyDown(event) {
        switch (event.key) {
            case ' ':
                if (renderer.isPlaying()) {
                    renderer.stop();
                } else {
                    renderer.start();
                }
                break;
            case 'n':
                if (renderer.isPlaying()) {
                    renderer.stop();
                }
                if (!renderer.isPlaying()) {
                    renderer.start(true);
                }
                break;
            case 'c':
                if (renderer.isPlaying()) {
                    renderer.stop();
                }
                gameObjects.universe.clear();
                renderer.draw();
                break;
            case 'r':
                if (renderer.isPlaying()) {
                    renderer.stop();
                }
                gameObjects.universe.reset();
                renderer.draw();
                break;
            case 's':
                benchSynthing();
                break;
            case 'o':
                window.getAll();
                break;
            case 'p':
                console.log("starting playing..")
                synth.play();
                break;
            case 'P':
                console.log("stopping playing..")
                synth.cancelPlayTimer();
                break;
            case 'z':
                synth.incrFrequency(-1)
                break;
            case 'x':
                synth.incrFrequency(+1)
                break;
            case 'Z':
                synth.incrFrequency(-2)
                break;
            case 'X':
                synth.incrFrequency(+2)
                break;
        }

        if (event.shiftKey) {
            synth.noteOn();
        }
    }

    
    /**
     * @param {MouseEvent} event
     */
    function onKeyUp(event) {
        if (event.shiftKey) {
            synth.noteOff();
        }
    }

    function onMouseDown(event) {
        const x = event.offsetX;
        const y = event.offsetY;

        const {width, height} = renderer.size();

        const ix = Math.floor(x / (CELL_SIZE + 1));
        const iy = Math.floor(y / (CELL_SIZE + 1));

        if (event.button === 0) {
            gameObjects.universe.toggle(ix, iy);
            renderer.draw();
        }
        console.log({ix, iy});
        console.log({width, height});
        if (ix < 4) {
            synth.play();
        }
    }
}

function drawGrid(ctx, width, height) {
    ctx.beginPath();
    ctx.strokeStyle = GRID_COLOR;

    for (let i = 0; i <= width; i++) {
        ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0);
        ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1);
    }

    for (let j = 0; j <= height; j++) {
        ctx.moveTo(0, j * (CELL_SIZE + 1) + 1);
        ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1);
    }

    ctx.stroke();
}

function drawCells(ctx, width, height, universe) {
    const cellsPtr = universe.cells();
    const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);

    ctx.beginPath();

    ctx.fillStyle = ALIVE_COLOR;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if(cells[getIndex(width, row, col)] !== Cell.Dead) {
                ctx.fillRect(
                    col * (CELL_SIZE + 1) + 1,
                    row * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }
    }

    ctx.fillStyle = DEAD_COLOR;
    for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
            if(cells[getIndex(width, row, col)] === Cell.Dead) {
                ctx.fillRect(
                    col * (CELL_SIZE + 1) + 1,
                    row * (CELL_SIZE + 1) + 1,
                    CELL_SIZE,
                    CELL_SIZE
                );
            }
        }
    }

    ctx.stroke();
}

function getIndex(width, row, column) {
    return row * width + column;
}

main();