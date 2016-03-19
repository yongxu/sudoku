import * as types from '../constants/ActionTypes'

import AsyncSolver from '../solver/AsyncSolver'
import * as SodokuSolver from '../solver/SudokuSolver'


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

export function solve(data, async) {
  if (async) {
    let solver = new AsyncSolver()
    return (dispatch, getState) => {
      //not quite working yet
      solver.solve(data || getState().sudoku.data).then(data => {
        dispatch(showSolution(data))
      })
    }
  }
  return (dispatch, getState) => {
     let res = SodokuSolver.solveWrapper(data || getState().sudoku.data)
     dispatch(showSolution(res))
  }
}

export function showSolution(data) {
  return { type: types.SHOW_SOLUTION, data }
}

export function sudokuMode() {
  return { type: types.NEW_GAME, mode: types.SUDOKU_MODE}
}

export function hexSudokuMode() {
  return { type: types.NEW_GAME, mode: types.HEXSUDOKU_MODE}
}

export function switchMode() {
  return (dispatch, getState) => {
    if (getState().sudoku.mode === types.HEXSUDOKU_MODE)
      dispatch(sudokuMode())
    else
      dispatch(hexSudokuMode())
  }
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
