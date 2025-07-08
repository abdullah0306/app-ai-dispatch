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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/business-details',
    element: <BusinessDetails />
  },
  {
    path: '/services',
    element: <Services />
  },
  {
    path: '/greeting',
    element: <Greeting />
  },
  {
    path: '/lead-sources',
    element: <LeadSources />
  },
  {
    path: '/service-settings',
    element: <ServiceSettings />
  },
  {
    path: '/permissions',
    element: <Permissions />
  },
  {
    path: '/restrictions',
    element: <Restrictions />
  },
  {
    path: '/faqs',
    element: <FAQs />
  },
  {
    path: '/pricing',
    element: <Pricing />
  }
])