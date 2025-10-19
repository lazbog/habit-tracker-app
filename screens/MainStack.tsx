'use client'

import React, { useState, useEffect } from 'react'
import HomeScreen from './HomeScreen'
import HabitsScreen from './HabitsScreen'
import ProfileScreen from './ProfileScreen'

type TabType = 'home' | 'habits' | 'profile'

interface MainStackProps {
  initialTab?: TabType
}

export default function MainStack({ initialTab = 'home' }: MainStackProps) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)
  const [isAnimating, setIsAnimating] = useState(false)

  // Handle tab switching with animation
  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return
    setIsAnimating(true)
    setTimeout(() => {
      setActiveTab(tab)
      setIsAnimating(false)
    }, 150)
  }

  // Restore last active tab from session storage
  useEffect(() => {
    const savedTab = sessionStorage.getItem('activeTab') as TabType
    if (savedTab && ['home', 'habits', 'profile'].includes(savedTab)) {
      setActiveTab(savedTab)
    }
  }, [])

  // Save active tab to session storage
  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab)
  }, [activeTab])

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen />
      case 'habits':
        return <HabitsScreen />
      case 'profile':
        return <ProfileScreen />
      default:
        return <HomeScreen />
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Main Content Area */}
      <main 
        className={`flex-1 overflow-hidden transition-opacity duration-150 ${
          isAnimating ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {renderActiveScreen()}
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around items-center max-w-md mx-auto">
          <button
            onClick={() => handleTabChange('home')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === 'home' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-label="Home"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            <span className="text-xs mt-1 font-medium">Home</span>
          </button>

          <button
            onClick={() => handleTabChange('habits')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === 'habits' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-label="Habits"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
              />
            </svg>
            <span className="text-xs mt-1 font-medium">Habits</span>
          </button>

          <button
            onClick={() => handleTabChange('profile')}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === 'profile' 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
            aria-label="Profile"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
              />
            </svg>
            <span className="text-xs mt-1 font-medium">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  )
}