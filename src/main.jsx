import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";
import { Provider } from 'react-redux';
import {store} from './store/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <StrictMode>
    <BrowserRouter>
     <ParallaxProvider>
    <App />
    </ParallaxProvider>
    </BrowserRouter>
   </StrictMode>,
   </Provider>
)
