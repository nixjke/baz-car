
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { CartProvider } from '@/context/CartContext';
import { ThemeProvider } from '@/context/ThemeProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
);
