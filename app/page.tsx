'use client'

import { useState, useEffect } from 'react'
import { BarChart3, Plus } from 'lucide-react'
import { Habit } from '@/lib/types'
import { loadHabits } from '@/lib/storage'
import AddHabitForm from '@/components/AddHabitForm'
import HabitItem from '@/components/HabitItem'
import StatsPage from '@/components/StatsPage'

export default function HomePage() {
  const [habits, setHabits] = useState<Habit[]>([])
  const [activeTab, setActiveTab] = useState<'habits' | 'stats'>('habits')
  
  useEffect(() => {
    setHabits(loadHabits())
  }, [])
  
  const refreshHabits = () => {
    setHabits(loadHabits())
  }
  
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Habit Tracker</h1>
          <p className="text-muted-foreground">
            Build better habits, one day at a time
          </p>
        </header>
        
        <div className="mb-6">
          <div className="flex gap-2 border-b">
            <button
              onClick={() => setActiveTab('habits')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'habits'
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Habits
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                activeTab === 'stats'
                  ? 'text-primary border-primary'
                  : 'text-muted-foreground border-transparent hover:text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Statistics
              </div>
            </button>
          </div>
        </div>
        
        {activeTab === 'habits' ? (
          <div className="space-y-6">
            <AddHabitForm onHabitAdded={refreshHabits} />
            
            {habits.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold mb-2">No habits yet</h3>
                <p className="text-muted-foreground">
                  Start building better habits by adding your first one above!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {habits.map((habit) => (
                  <HabitItem
                    key={habit.id}
                    habit={habit}
                    onUpdate={refreshHabits}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <StatsPage />
        )}
      </div>
    </div>
  )
}