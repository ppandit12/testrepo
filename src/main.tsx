import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ContactForm from './ContactForm.tsx'
import BusinessForm from './BusinessForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/business" element={<BusinessForm />} />
      </Routes>
    </Router>
  </StrictMode>,
)
