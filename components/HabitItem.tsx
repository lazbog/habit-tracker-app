'use client'

import { useState } from 'react'
import { Trash2, Calendar, TrendingUp, Check } from 'lucide-react'
import { Habit } from '@/lib/types'
import { deleteHabit, toggleHabitCompletion } from '@/lib/storage'
import { format } from 'date-fns'

interface HabitItemProps {
  habit: Habit
  onUpdate: () => void
}

export default function HabitItem({ habit, onUpdate }: HabitItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  
  const today = format(new Date(), 'yyyy-MM-dd')
  const isCompletedToday = habit.completedDates.includes(today)
  
  const getStreak = () => {
    if (habit.completedDates.length === 0) return 0
    
    let streak = 0
    const sortedDates = [...habit.completedDates].sort().reverse()
    
    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i])
      const expectedDate = new Date()
      expectedDate.setDate(expectedDate.getDate() - i)
      
      if (format(date, 'yyyy-MM-dd') === format(expectedDate, 'yyyy-MM-dd')) {
        streak++
      } else {
        break
      }
    }
    
    return streak
  }
  
  const handleToggle = () => {
    toggleHabitCompletion(habit.id, today)
    onUpdate()
  }
  
  const handleDelete = () => {
    if (isDeleting) {
      deleteHabit(habit.id)
      onUpdate()
    } else {
      setIsDeleting(true)
      setTimeout(() => setIsDeleting(false), 3000)
    }
  }
  
  const completionRate = habit.completedDates.length > 0
    ? Math.round((habit.completedDates.length / Math.max(1, Math.ceil((new Date().getTime() - new Date(habit.createdAt).getTime()) / (1000 * 60 * 60 * 24)))) * 100)
    : 0

  return (
    <div className="bg-card border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className="text-3xl"
            style={{ color: habit.color }}
          >
            {habit.icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-muted-foreground mt-1">
                {habit.description}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleToggle}
            className={`p-3 rounded-full transition-all ${
              isCompletedToday
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            <Check className="w-5 h-5" />
          </button>
          
          <button
            onClick={handleDelete}
            className={`p-2 rounded-md transition-colors ${
              isDeleting
                ? 'bg-destructive text-destructive-foreground'
                : 'text-muted-foreground hover:text-destructive'
            }`}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-4 h-4" />
          <span>{getStreak()} day streak</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4" />
          <span>{habit.completedDates.length} completed</span>
        </div>
        
        <div className="flex items-center gap-1">
          <span>{completionRate}% completion rate</span>
        </div>
      </div>
      
      {isCompletedToday && (
        <div className="text-sm text-green-600 font-medium">
          ✓ Completed today!
        </div>
      )}
      
      {isDeleting && (
        <div className="text-sm text-destructive">
          Click again to confirm deletion
        </div>
      )}
    </div>
  )
}