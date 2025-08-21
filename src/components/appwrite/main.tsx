import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@appwrite.io/pink-icons";
import App from './App.tsx'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
