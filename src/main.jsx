import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import './css/index.css';
import App from './App.jsx'

{/*Main calls App component and it wrappes it with <BrowserRouter> for two reasons:
  1. For the path and element in App 
  2. For the link in NavBar(outside of <Routes>) */}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </StrictMode>
)
