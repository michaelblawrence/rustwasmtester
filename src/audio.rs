use cityrust::dsp::delay::Delay;
use cityrust::dsp::reverb::Reverb;
use cityrust::synth::poly::CitySynth as PolySynth;
use cityrust::utils::loader;
use cityrust::utils::parameters::R;
use cityrust::utils::state::StateManager;

use wasm_bindgen::prelude::*;

use crate::utils;

#[wasm_bindgen]
pub struct CitySynth {
    poly: PolySynth,
    bucket: StateManager<R, f64>,
}

#[wasm_bindgen]
impl CitySynth {
    pub fn new() -> Self {
        utils::set_panic_hook();
        let mut bucket = StateManager::new();
        loader::load_defaults(&mut bucket);

        Self {
            poly: PolySynth::new(44100.0, 1, bucket.clone()),
            bucket,         
        }
    } 

    pub fn read(&mut self, buffer: &mut [f64]) {
        self.poly.read(buffer);
    }

    pub fn set_buffer_len(&mut self, samples: usize) {
        self.poly.set_buffer_len(samples);
    }

    pub fn note_on(&mut self) {
        self.poly.note_on();
    }

    pub fn note_off(&mut self) {
        self.poly.note_off();
    }

    pub fn set_freq(&mut self, freq: f64) {
        self.bucket.set(R::Frequency, freq);
    }

    // pub fn get_state(&self, key: R) -> f64 {
    //     self.poly.bucket().get(key)
    // }

    // pub fn set_state(&mut self, key: R, value: f64) {
    //     self.poly.bucket().set(key, value);
    // }
}