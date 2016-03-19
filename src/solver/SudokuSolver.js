export const validHexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
export const validValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]

export function possibleRowValues(data, row, size = 16) {
  let possibleFit = new Set(size === 16 ? validHexValues : validValues)
  for (let i=row*size;i<(row+1)*size;i++) {
    const v = data[i]
    if (v>=0) possibleFit.delete(v)
  }
  return possibleFit
}

export function possibleColValues(data, col, size = 16) {
  let possibleFit = new Set(size === 16 ? validHexValues : validValues)
  for (let i=0;i<size-1;i++) {
    const v = data[i*size+col]
    if (v>=0) possibleFit.delete(v)
  }
  return possibleFit
}

export function possibleSubGridValues(data, row, col, size = 16) {
  const gridSize = size === 16 ? 4 : 3

  let possibleFit = new Set(size === 16 ? validHexValues : validValues)
  const rowStart = (~~(row / gridSize)) * gridSize
  const colStart = (~~(col / gridSize)) * gridSize
  for (let i=rowStart;i<rowStart+gridSize;i++) {
    for (let j=colStart;j<colStart+gridSize;j++) {
      const v = data[i*size+j]
      if (v>=0) possibleFit.delete(v)
    }
  }
  return possibleFit
}

export function validateMove(data, index, value, boardSize = 16) {
  const row = ~~(index / boardSize)
  const col = index % boardSize
  return possibleRowValues(data, row, boardSize).has(value) &&
         possibleColValues(data, col, boardSize).has(value) &&
         possibleSubGridValues(data, row, col, boardSize).has(value)
}

function randomIndex(list){
  return Math.floor(Math.random() * list.length)
}

function shuffle(list) {
    list = list.slice()

    for (let i = list.length-1; i >=0; i--) {

        let randomIndex = Math.floor(Math.random()*(i+1));
        let itemAtIndex = list[randomIndex];

        list[randomIndex] = list[i];
        list[i] = itemAtIndex;
    }

    return list;
}

export function solveWrapper(boardData , maxIteration = 1000000000){
  let data = boardData.slice()
  let counter = 0

  const boardSize = boardData.length === 256 ? 16 : 9

  function solve(index){
    if (counter++ > maxIteration) {
      return data
    }
    let lastValue = data[index]

    const row = ~~(index / boardSize)
    const col = index % boardSize

    let rowValues = possibleRowValues(data, row, boardSize)
    let colValues = possibleColValues(data, col, boardSize)
    let subGridValues = possibleSubGridValues(data, row, col, boardSize)

    const possibleFit = [...rowValues].filter(x => colValues.has(x))
                        .filter(x => subGridValues.has(x))

    if(possibleFit.length === 0) return null

    for (let value of possibleFit){
      data[index] = value
      let nextIndex = data.findIndex((v)=>v<0)
      if (nextIndex === -1) return data
      let res = solve(nextIndex)
      if (res) {
        return res
      }
    }
    data[index] = lastValue //back track, reset to last value

    return null
  }

  let list = []
  for (let index in data){
    let value = data[index]
    if (value<0) {
      list.push(index)
    } else {
      data[index] = -1
      let valid = validateMove(data, index, value, boardSize)
      if (!valid) {
        return null
      }
      data[index] = value
    }
  }
//  list = shuffle(list)

  let res = solve(list[0])
  if (res) return res
  return null
}
