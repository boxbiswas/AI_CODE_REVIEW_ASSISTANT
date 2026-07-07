import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { store } from './redux/store.js';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext.jsx';
import './index.css'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  // </StrictMode>
)
