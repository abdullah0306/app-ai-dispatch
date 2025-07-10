import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { router } from './router'
import { AuthProvider } from './contexts/AuthContext'
import { ScrapedDataProvider } from './contexts/ScrapedDataContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ScrapedDataProvider>
        <RouterProvider router={router} />
      </ScrapedDataProvider>
    </AuthProvider>
  </StrictMode>,
)
