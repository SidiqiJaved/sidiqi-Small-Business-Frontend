import { Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { DemoToggle } from './components/DemoToggle'

// Public Pages
import { HomePage } from './pages/HomePage'
import { OurStoryPage } from './pages/OurStoryPage'
import { OnlineOrderingPage } from './pages/OnlineOrderingPage'
import { LocationsPage } from './pages/LocationsPage'
import { ContactPage } from './pages/ContactPage'
import { LoginPage } from './pages/LoginPage'

// Private Pages
import { DashboardPage } from './pages/DashboardPage'
import { InspectionsPage } from './pages/InspectionsPage'
import { TrainingPage } from './pages/TrainingPage'
import { InventoryPage } from './pages/InventoryPage'
import { ReportsPage } from './pages/ReportsPage'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, userRole } = useAuth()
  
  if (!isLoggedIn || !['admin', 'franchisee', 'manager'].includes(userRole)) {
    return <Navigate to="/login" replace />
  }
  
  return <>{children}</>
}

function AppContent() {
  const { isLoggedIn, userRole } = useAuth()
  
  return (
    <div className="min-h-screen flex flex-col">
      <DemoToggle />
      <Navigation />
      
      <main className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/our-story" element={<OurStoryPage />} />
          <Route path="/online-ordering" element={<OnlineOrderingPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Private Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/inspections" element={
            <ProtectedRoute>
              <InspectionsPage />
            </ProtectedRoute>
          } />
          <Route path="/training" element={
            <ProtectedRoute>
              <TrainingPage />
            </ProtectedRoute>
          } />
          <Route path="/inventory" element={
            <ProtectedRoute>
              <InventoryPage />
            </ProtectedRoute>
          } />
          <Route path="/reports" element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          } />
          
          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}