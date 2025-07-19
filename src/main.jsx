import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'

const SECRET = import.meta.env.VITE_SECRET
console.log("🚀 ~ SECRET:", SECRET) // Will now log: my-secret-123
console.log("All env vars:", import.meta.env)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>hello</h1>
  </StrictMode>,
)