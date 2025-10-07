import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/index.scss'
import App from './App.tsx'

// Initialize theme before app renders to avoid FOUC
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
const isDark = storedTheme ? storedTheme === 'dark' : prefersDark

if (isDark) {
  document.documentElement.classList.add('dark')
} else {
  document.documentElement.classList.remove('dark')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
