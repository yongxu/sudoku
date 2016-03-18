import React, { PropTypes, Component } from 'react'
import '../css/sudoku.css'

const row = ({data,start,end,updateCell}) => {
  let tds = []
  for (let i=start;i<end;i++) {
    let cell = data[i]
    let td;
    if (cell.locked) {
      td = (<td key={i}><b>{cell.value}</b></td>)
    } else {
      td = (<td key={i} >
          <input
            value={cell.value}
            style={{
              color: cell.invalid ? 'red' : 'black'
            }}
            maxLength="1"
            onChange={(e)=>{
              updateCell(i,e.target.value)
            }} />
        </td>)
    }
    tds.push(td)
  }
  return (
    <tr key={start}>
      {tds}
    </tr>
  )
}

class SudokuBoard extends Component {
  render() {
    const {
      data,
      updateCell
    } = this.props

    let trs = []
    let boardType =''
    if (data.length === 9*9){
      for(let i = 0;i<9;i++){
        trs.push(row({
          data,
          start: i*9,
          end: (i+1)*9,
          updateCell
        }))
      }
      boardType = 'sudokuBoard'
    }else if(data.length === 16*16){
      for(let i = 0;i<16;i++){
        trs.push(row({
          data,
          start: i*16,
          end: (i+1)*16,
          updateCell
        }))
      }
      boardType = 'hexSudokuBoard'
    }
    else {
      return (<div>sudoku board data is not valid</div>)
    }

    return (
      <div className='sudoku'>
        <table className={boardType}>
          <tbody>
            {trs}
          </tbody>
        </table>
      </div>
    )
  }
}

SudokuBoard.propTypes = {
  data: PropTypes.array.isRequired,
}

SudokuBoard.defaultProps = {
  data: [],
  undateCell: ()=>{}
}

export default SudokuBoard
