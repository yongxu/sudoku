import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/lib/raised-button'
import Dialog from 'material-ui/lib/dialog'
import {deepOrange500} from 'material-ui/lib/styles/colors'
import FlatButton from 'material-ui/lib/flat-button'
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider'
import Toggle from 'material-ui/lib/toggle';

import SudokuBoard from '../components/SudokuBoard'
import * as SudokuActions from '../actions'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 30,
  },
}

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
})

class App extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      openDialog: false
    }

    this.props.actions.newGame()
  }

  render() {
    const { sudoku, actions } = this.props

    const dialogActions = (
      <FlatButton
        label="Okey"
        secondary={true}
        onTouchTap={()=>this.setState({openDialog: false})}
      />
    )

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Dialog
            open={this.state.openDialog}
            title="You Win"
            actions={dialogActions}
            onRequestClose={()=>this.setState({openDialog: false})}
          >
            umm...
          </Dialog>
          <h1>sudoku</h1>
          <SudokuBoard data={sudoku.board} updateCell={actions.updateCell}/>
          <div>
            <RaisedButton
              label="Load Game"
              primary={true}
              onTouchTap={()=>actions.newGame()}
            />
            <RaisedButton
              style={{marginLeft:'30px'}}
              label="Empty board"
              primary={true}
              onTouchTap={()=>actions.newGame(null,true)}
            />
            <RaisedButton
              style={{marginLeft:'30px'}}
              label="Solve"
              primary={true}
              onTouchTap={()=>actions.solve()}
            />
          </div>
          <div>
            <span>
              <Toggle
                label="Hex Mode"
                style={{
                  maxWidth: 140,
                  toggle: {
                    marginBottom: 16,
                  },
                }}
                toggled={sudoku.mode === 'HEXSUDOKU_MODE'}
                onToggle={(e)=>{
                  actions.switchMode()
                }}
              />
            </span>
          </div>
          <h2 className="hint">{sudoku.hint}</h2>
        </div>
      </MuiThemeProvider>
    )
  }
}

App.propTypes = {
  sudoku: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    sudoku: state.sudoku
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(SudokuActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
