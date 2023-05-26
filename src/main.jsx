import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Router>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        {/* </PersistGate> */}
      </Provider>
    </Router>
  // </React.StrictMode>,
)
