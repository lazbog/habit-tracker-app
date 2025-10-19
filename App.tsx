import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import AppNavigator from './navigation/AppNavigator'
import './globals.css'

// Error fallback component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-red-600 mb-2">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Reload App
      </button>
    </div>
  </div>
)

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
)

// Main App component
export default function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, errorInfo) => {
        // Log error to monitoring service in production
        console.error('App Error:', error, errorInfo)
        // Example: Sentry.captureException(error)
      }}
    >
      <Suspense fallback={<LoadingSpinner />}>
        <div className="app-container">
          <AppNavigator />
        </div>
      </Suspense>
    </ErrorBoundary>
  )
}

// App metadata for Next.js
export const metadata = {
  title: 'Habit Tracker - Build Better Habits',
  description: 'Track your daily habits and build consistency with our intuitive habit tracking app',
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#2563eb',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}