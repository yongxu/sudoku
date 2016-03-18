import * as types from '../constants/ActionTypes'

export function newGame(index, empty) {
  return { type: types.NEW_GAME, index, empty}
}

export function restartGame() {
  return { type: types.RESTART }
}

export function undoMove() {
  return { type: types.UNDO_MOVE }
}

export function updateCell(index, value) {
  return { type: types.UPDATE_CELL, index, value }
}

export function showSolution() {
  return { type: types.SHOW_SOLUTION }
}

export function sudokuMode() {
  return { type: types.SUDOKU_MODE }
}

export function hexSudokuMode() {
  return { type: types.HEXSUDOKU_MODE }
}

export function timerUpdate() {
  return { type: types.TIMER_UPDATE }
}

export function showHint() {
  return { type: types.SHOW_HINT }
}

export function clearBoard() {
  return { type: types.CLEAR_BOARD }
}
