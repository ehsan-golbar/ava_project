import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import store from './components/store/store.ts'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <BrowserRouter>
  <React.StrictMode>

  <Provider store={store}>
    <App />

    </Provider>
  </React.StrictMode>,
  </BrowserRouter>
)
