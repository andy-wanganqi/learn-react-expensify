import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRouter from './routes/app-router.jsx'

import 'normalize.css/normalize.css'
import './styles/index.scss'

ReactDOM.createRoot(document.getElementById('root'))
  .render(<AppRouter />);
