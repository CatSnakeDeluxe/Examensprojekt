import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { PostContextProvider } from './context/PostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <PostContextProvider>
          <App/>
    </PostContextProvider>
  </BrowserRouter>
);
