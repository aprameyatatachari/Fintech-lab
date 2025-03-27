import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { startMockWorker } from './setupMockApi'

// Initialize mock API for development
// Initialize mock API for development
if (import.meta.env.MODE === 'development') {
  startMockWorker();
}
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
  </StrictMode>,
)
