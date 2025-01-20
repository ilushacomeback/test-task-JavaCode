// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from './providers/routerProvider';
import { store } from './model/store/store';
import { NavBar } from '@/widgets';
import './ui/reset.css';
import './ui/index.css';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider>
        <NavBar />
      </RouterProvider>
    </Provider>

);
