pub mod utils;
mod audio;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum CellEvent {
    Underpopulation,
    LivesOn,
    Overpopulation,
    Reproduction,
    NoChange
}

#[wasm_bindgen]
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    width: u32,
    height: u32,
    cells: Vec<Cell>,
    next_cells: Vec<Cell>,
    events: Vec<(CellEvent, u16)>
}

#[wasm_bindgen]
impl Universe {
    pub fn new() -> Universe {
        utils::set_panic_hook();
        let width = 64;
        let height = 64;

        let (cells, next_cells) = Universe::init_cells(width, height);
        let events = vec![(CellEvent::NoChange, 0); 128];

        Universe {
            width,
            height,
            cells,
            next_cells,
            events,
        }
    }
    
    pub fn width(&self) -> u32 {
        self.width
    }

    pub fn height(&self) -> u32 {
        self.height
    }
    
    pub fn set_size(&mut self, width: u32, height: u32) {
        let (cells, next_cells) = Universe::init_cells(width, height);
        self.width = width;
        self.height = height;
        self.cells = cells;
        self.next_cells = next_cells;
    }

    pub fn cells(&self) -> *const Cell {
        self.cells.as_ptr()
    }

    fn get_index(&self, row: u32, column: u32) -> usize {
        (row * self.width + column) as usize
    }

    fn init_cells(width: u32, height: u32) -> (Vec<Cell>, Vec<Cell>) {
        let cells = Universe::get_init_cells(width, height);
        let next_cells = cells.clone();

        (cells, next_cells)
    }

    fn get_init_cells(width: u32, height: u32) -> Vec<Cell> {
        (0..width * height).map(|i| {
            if i % 2 == 0 || i % 7 == 0 {
                Cell::Alive
            } else {
                Cell::Dead
            }
        })
        .collect()
    }

    fn live_neighbor_count(&self, row: u32, column: u32) -> u8 {
        let mut count = 0;
        for delta_row in &[self.height - 1, 0, 1] {
            for delta_col in &[self.width - 1, 0, 1] {
                if *delta_row == 0 && *delta_col == 0 {
                    continue;
                }

                let neighbor_row = (row + *delta_row) % self.height;
                let neighbor_col = (column + *delta_col) % self.width;
                let idx = self.get_index(neighbor_row, neighbor_col);
                count += self.cells[idx] as u8;
            }
        }
        count
    }

    pub fn reset(&mut self) {
        self.next_cells = Universe::get_init_cells(self.width, self.height);
        self.cells.clone_from_slice(&self.next_cells);
    }

    pub fn clear(&mut self) {
        for idx in 0..self.width * self.height {
            self.next_cells[idx as usize] = Cell::Dead;
            self.cells[idx as usize] = Cell::Dead;
        }
    }

    pub fn toggle(&mut self, ix: u32, iy: u32) {
        for ix in ix-1..=ix+1 {
            for iy in iy-1..=iy+1 {
                let idx = self.get_index(iy % self.height, ix % self.width);
                self.toggle_idx(idx);
            }
        }
    }

    fn toggle_idx(&mut self, idx: usize) {
        let cell = match self.cells[idx] {
            Cell::Dead => Cell::Alive,
            Cell::Alive => Cell::Dead,
        };
        self.next_cells[idx] = cell;
        self.cells[idx] = cell;
    }

    pub fn tick(&mut self) {
        for _ in 0..1 {
            self.tick_next_cells();
        }
        self.cells.clone_from_slice(&self.next_cells);
    }

    fn tick_next_cells(&mut self) {
        for row in 0..self.height {
            for col in 0..self.width {
                self.generate_next_cell(row, col);
            }
        }
    }

    fn generate_next_cell(&mut self, row: u32, col: u32) {
        let idx = self.get_index(row, col);
        let cell = self.next_cells[idx];
        let live_neighbors = self.live_neighbor_count(row, col);
        let event_type = match (cell, live_neighbors) {
            (Cell::Alive, x) if x < 2           => CellEvent::Underpopulation,
            (Cell::Alive, 2) | (Cell::Alive, 3) => CellEvent::LivesOn,
            (Cell::Alive, x) if x > 3           => CellEvent::Overpopulation,
            (Cell::Dead, 3)                     => CellEvent::Reproduction,
            (_, _)                              => CellEvent::NoChange,
        };

        self.publish_cell_event(idx, event_type);

        self.next_cells[idx] = match event_type {
            CellEvent::Underpopulation => Cell::Dead,
            CellEvent::LivesOn         => Cell::Alive,
            CellEvent::Overpopulation  => Cell::Dead,
            CellEvent::Reproduction    => Cell::Alive,
            CellEvent::NoChange        => cell,
        };
    }

    
    fn publish_cell_event(&mut self, idx: usize, event_type: CellEvent) {
        if self.events.len() < 128 {
            self.events.push((event_type, idx as u16));
        }
    }
}
