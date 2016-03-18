import {
  NEW_GAME,
  RESTART,
  UNDO_MOVE,
  UPDATE_CELL,
  SOLVE_GAME,
  SHOW_SOLUTION,
  SUDOKU_MODE,
  HEXSUDOKU_MODE,
  TIMER_UPDATE,
  SHOW_HINT,
  CLEAR_BOARD,
} from '../constants/ActionTypes'

import * as hexSodokuSolver from '../solver/hexSudoku'

const initialState ={
  gameIndex: '',
  initialData: [],
  data: [],
  board: [],
  solution: null,
  hint: '',
  moves: [],
  time: 0,
}

function createBoard(boardData, lockedData){
  let canLock = false
  if (lockedData && lockedData.length === boardData.length){
    canLock = true
  }
  const board = boardData.map((value,index)=>{
    let locked = canLock && boardData[index] === lockedData[index]
    return value < 0 ? {
    } : {
      value: value < 10 ? value.toString() : String.fromCharCode(87+value),
      locked
    }
  })
  return board;
}

function combineMovesWithData(data,moves){
  let combinedBoard = createBoard(data,data)
  let updatedData = data.slice()

  moves.forEach((m)=>{
    combinedBoard[m.index] = {
      value: m.value,
      locked: false,
      invalid: !hexSodokuSolver.validateMove(updatedData,m.index,m.value)
    }
    updatedData[m.index] = m.value
  })

  return {combinedBoard, updatedData}
}

function cellInputToNumber(n){
  const c = n.charCodeAt(0)
  if (c>=48 && c<=57) return c-48 //'0'-'9'
  else if (c>=65 && c<=70) return c-55 //A-F
  else if (c>=97 && c<=102) return c-87 //a-f
  else return -1
}

export default function sudoku(state = initialState, action) {
  switch (action.type) {
    case NEW_GAME:
      if (action.gameIndex) {
        return state
      }
      else if (action.empty) {
        const initialData = new Array(256).fill(-1)
        const board = createBoard(initialData,initialData)
        return {
          ...state,
          initialData,
          data: initialData,
          board,
          solution: null,
          moves: [],
          time: 0
        }
      }
      else {
        const game = JSON.parse(require('raw!../../data/hexSudoku/game1.json'))
        const initialData = game.initialData
        const board = createBoard(initialData,initialData)
        return {
          ...state,
          initialData,
          data: initialData,
          board,
          solution: null,
          moves: [],
          time: 0
        }
      }
    case RESTART:
      return state

    case UNDO_MOVE:
      return state

    case UPDATE_CELL:
      const value = cellInputToNumber(action.value)
      const index = action.index
      let updatedMoves = state.moves.filter((m)=>m.index!==index)
      if (value >=0){
        updatedMoves.push({value, index})
      }
      let {combinedBoard, updatedData} = combineMovesWithData(state.initialData,updatedMoves)
      return {
        ...state,
        hint: '',
        moves: updatedMoves,
        data: updatedData,
        board: combinedBoard
      }

    case SOLVE_GAME:
      return state

    case SHOW_SOLUTION:
      let res = hexSodokuSolver.solveWrapper(state.data)
      let board = res ? createBoard(state.initialData, res) :
                        createBoard(state.initialData, state.initialData)
      return {...state, board}

    case SUDOKU_MODE:
      return state

    case HEXSUDOKU_MODE:
      return state

    case TIMER_UPDATE:
      return state

    case SHOW_HINT:
      return state

    default:
      return state
  }
}
