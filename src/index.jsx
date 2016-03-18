import React from 'react'
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { Provider } from 'react-redux'

import './css/main.css'
import App from './containers/App'
import configureStore from './store/configureStore'

//Needed for Material-UI onTouchTap
//Can go away when react 1.0 release
injectTapEventPlugin()

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)
