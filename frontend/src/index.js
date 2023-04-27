import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import { PostContextProvider } from './context/PostContext';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <PostContextProvider>
        <App/>
      </PostContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
