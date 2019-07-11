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

    pub fn read(&mut self, buffer: &mut [f32]) {
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

    pub fn set_freq(&mut self, freq: f64) -> f64 {
        let old_value = self.poly.state().get(R::Frequency);
        self.bucket.set(R::Frequency, freq);
        old_value
    }

    pub fn get_state(&self, key: Param) -> f64 {
        if let Some(key) = key.to_inner_param() {
            match key {
                R::Sustain => self.poly.state().get(key) * 100.0,
                _ => self.poly.state().get(key)
            }
        } else {
            match key {
                Param::DelayWet => self.poly.delay_wet * 100.0,
                Param::ReverbWet => self.poly.reverb_wet * 100.0,
                _ => 0.0
            }
        }
    }

    pub fn set_state(&mut self, key: Param, value: f64) -> f64 {
        if let Some(key) = key.to_inner_param() {
            match key {
                R::Sustain => {
                    let old_value = self.poly.state().get(key) * 100.0;
                    self.poly.state_mut().set(key, value * 0.01);
                    old_value
                },
                _ => {
                    let old_value = self.poly.state().get(key);
                    self.poly.state_mut().set(key, value);
                    old_value
                }
            }
        } else {
            match key {
                Param::DelayWet => {
                    self.poly.delay_wet = value / 100.0;
                    self.poly.delay_wet
                },
                Param::ReverbWet =>{
                    self.poly.reverb_wet = value / 100.0;
                    self.poly.reverb_wet
                },
                _ => 0.0
            }
        }
    }

    pub fn refresh(&mut self) {
        self.poly.refresh();
    }
}

#[wasm_bindgen]
pub enum Param {
    Attack,
    // AmpLFOrate,
    // AmpLFOwidth,
    Decay,
    DelayWet,
    // FMScale,
    // Frequency,
    // GeneralAtten,
    Harmonic2Gain,
    HarmonicsControl,
    HarmonicFix,
    HarmonicFunction,
    HarmonicPhase,
    HarmonicV1,
    HPFCutoff,
    LPF,
    // LPFattack,
    // LPFceiling,
    // LPFenvelope,
    // LPFfloor,
    LPFmodrate,
    LPFrelease,
    LPFwidth,
    // MaxHarmonic,
    // MaxVelocity,
    Pitchmod,
    PitchmodWidth,
    // PitchBendFactor,
    Release,
    ReverbWet,
    SubOscGain,
    Sustain,
    WFunction,
}

impl Param {
    fn to_inner_param(&self) -> Option<R> {
        match self {
            Param::Attack                => Some(R::Attack),
            Param::Decay                 => Some(R::Decay),
            Param::DelayWet              => None,
            Param::Harmonic2Gain         => Some(R::Harmonic2Gain),
            Param::HarmonicsControl      => Some(R::HarmonicsControl),
            Param::HarmonicFix           => Some(R::HarmonicFix),
            Param::HarmonicFunction      => Some(R::HarmonicFunction),
            Param::HarmonicPhase         => Some(R::HarmonicPhase),
            Param::HarmonicV1            => Some(R::HarmonicV1),
            Param::HPFCutoff             => Some(R::HPFCutoff),
            Param::LPF                   => Some(R::LPF),
            Param::LPFmodrate            => Some(R::LPFmodrate),
            Param::LPFrelease            => Some(R::LPFrelease),
            Param::LPFwidth              => Some(R::LPFwidth),
            Param::Pitchmod              => Some(R::Pitchmod),
            Param::PitchmodWidth         => Some(R::PitchmodWidth),
            Param::Release               => Some(R::Release),
            Param::ReverbWet             => None,
            Param::SubOscGain            => Some(R::SubOscGain),
            Param::Sustain               => Some(R::Sustain),
            Param::WFunction             => Some(R::WFunction),
            // _ => None,
        }
    }
}