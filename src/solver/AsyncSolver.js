export default class Solver{
  constructor(){
    let solverWorker = new Worker(require("file!./solverWorker.js"))

    solverWorker.addEventListener('solve',
          this.receiveData.bind(this), false);
    this.solverWorker = solverWorker
  }
  receiveData(e){
    this.resolve(e.data)
  }
  solve(data){
    this.solverWorker.postMessage(data)
    return new Promise((resolve, reject) => {
      this.resolve = resolve
    })
  }
}
