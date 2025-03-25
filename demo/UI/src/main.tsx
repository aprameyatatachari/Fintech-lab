import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Add a style tag to ensure the body background color is set
const style = document.createElement('style')
style.textContent = `
  body {
    background-color: #0a0a18 !important;
  }
`
document.head.appendChild(style)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)