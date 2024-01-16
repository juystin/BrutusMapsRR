import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import 'maplibre-gl/dist/maplibre-gl.css';
import GlobalStyles from './App/css/globalStyle';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
  </React.StrictMode>,
)
