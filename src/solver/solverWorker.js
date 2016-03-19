import * as SodokuSolver from './SudokuSolver'

self.addEventListener('solve', e => {
  console.log(e)
  let solution = SodokuSolver.solve(e.data)
  self.postMessage(solution);
}, false);
