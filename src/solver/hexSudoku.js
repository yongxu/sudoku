export const validValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

export function possibleRowValues(data,row) {
  let possibleFit = new Set(validValues)
  for (let i=row*16;i<(row+1)*16;i++) {
    const v = data[i]
    if (v>=0) possibleFit.delete(v)
  }
  return possibleFit
}

export function possibleColValues(data,col) {
  let possibleFit = new Set(validValues)
  for (let i=0;i<15;i++) {
    const v = data[i*16+col]
    if (v>=0) possibleFit.delete(v)
  }
  return possibleFit
}

export function possibleSubGridValues(data,row,col) {
  let possibleFit = new Set(validValues)
  const rowStart = (~~(row / 4)) * 4
  const colStart = (~~(col / 4)) * 4
  for (let i=rowStart;i<rowStart+4;i++) {
    for (let j=colStart;j<colStart+4;j++) {
      const v = data[i*16+j]
      if (v>=0) possibleFit.delete(v)
    }
  }
  return possibleFit
}

export function updateCell(index, value) {
  return { type: types.UPDATE_CELL, index, value }
}

export function validateMove(data, index, value) {
  const row = ~~(index / 16)
  const col = index % 16
  return possibleRowValues(data,row).has(value) &&
         possibleColValues(data,col).has(value) &&
         possibleSubGridValues(data,row,col).has(value)
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

export function solveWrapper(boardData){
  let data = boardData.slice()
  let counter = 0
  function solve(index){
    if (counter++ > 1000000) return data

    let lastValue = data[index]

    const row = ~~(index / 16)
    const col = index % 16

    let rowValues = possibleRowValues(data,row)
    let colValues = possibleColValues(data,col)
    let subGridValues = possibleSubGridValues(data,row,col)

    const possibleFit = [...rowValues].filter(x => colValues.has(x))
                        .filter(x => subGridValues.has(x))

    if(possibleFit.length === 0) return null

    for (let value of possibleFit){
      for (let nextIndex in data){
        if (data[nextIndex] >=0 ) continue
        data[index] = value
        let res = solve(nextIndex)
        if (res) {
          return res
        }
        data[index] = lastValue //back trace
      }
    }

    return null
  }
  let list = []
  for (let index in data){
    let value = data[index]
    if (value<0) {
      list.push(index)
    } else {
      data[index] = -1
      let valid = validateMove(data, index, value)
      data[index] = value
      if (!valid) return null
    }
  }
  list = shuffle(list)
  for (let index of list){
    let res = solve(index)
    if (res) return res
  }
  return null
}
