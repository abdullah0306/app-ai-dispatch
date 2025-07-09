import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import BusinessDetails from './pages/BusinessDetails'
import Services from './pages/Services'
import Greeting from './pages/Greeting'
import LeadSources from './pages/LeadSources'
import ServiceSettings from './pages/ServiceSettings'
import Permissions from './pages/Permissions'
import Restrictions from './pages/Restrictions'
import FAQs from './pages/FAQs'
import Pricing from './pages/Pricing'
import PaymentDetails from './pages/PaymentDetails'
import Success from './pages/Success'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <ProtectedRoute requireAuth={false}><Login /></ProtectedRoute>
  },
  {
    path: '/',
    element: <ProtectedRoute><App /></ProtectedRoute>
  },
  {
    path: '/business-details',
    element: <ProtectedRoute><BusinessDetails /></ProtectedRoute>
  },
  {
    path: '/services',
    element: <ProtectedRoute><Services /></ProtectedRoute>
  },
  {
    path: '/greeting',
    element: <ProtectedRoute><Greeting /></ProtectedRoute>
  },
  {
    path: '/lead-sources',
    element: <ProtectedRoute><LeadSources /></ProtectedRoute>
  },
  {
    path: '/service-settings',
    element: <ProtectedRoute><ServiceSettings /></ProtectedRoute>
  },
  {
    path: '/permissions',
    element: <ProtectedRoute><Permissions /></ProtectedRoute>
  },
  {
    path: '/restrictions',
    element: <ProtectedRoute><Restrictions /></ProtectedRoute>
  },
  {
    path: '/faqs',
    element: <ProtectedRoute><FAQs /></ProtectedRoute>
  },
  {
    path: '/pricing',
    element: <ProtectedRoute><Pricing /></ProtectedRoute>
  },
  {
    path: '/payment-details',
    element: <ProtectedRoute><PaymentDetails /></ProtectedRoute>
  },
  {
    path: '/success',
    element: <ProtectedRoute><Success /></ProtectedRoute>
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>
  }
])