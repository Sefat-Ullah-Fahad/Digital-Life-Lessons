import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router/dom'
import { router } from './routes/Routes.jsx'
import AuthProvider from './providers/AuthProvider.jsx'

// ১. React Query ইমপোর্ট করুন
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// ২. একটি ক্লায়েন্ট তৈরি করুন
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* ৩. QueryClientProvider দিয়ে সবকিছু মুড়িয়ে দিন */}
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)