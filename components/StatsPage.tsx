'use client'

import { useEffect, useState } from 'react'
import { Trophy, Target, TrendingUp, Calendar } from 'lucide-react'
import { Habit, HabitStats } from '@/lib/types'
import { loadHabits } from '@/lib/storage'
import { format, differenceInDays, startOfDay } from 'date-fns'

export default function StatsPage() {
  const [stats, setStats] = useState<HabitStats | null>(null)
  
  useEffect(() => {
    const calculateStats = () => {
      const habits = loadHabits()
      const today = format(new Date(), 'yyyy-MM-dd')
      
      const totalHabits = habits.length
      const completedToday = habits.filter(h => h.completedDates.includes(today)).length
      
      let longestStreak = 0
      let currentStreak = 0
      let totalCompletions = 0
      let totalPossibleCompletions = 0
      
      habits.forEach(habit => {
        totalCompletions += habit.completedDates.length
        
        const daysSinceCreation = differenceInDays(
          new Date(),
          new Date(habit.createdAt)
        ) + 1
        totalPossibleCompletions += daysSinceCreation
        
        if (habit.completedDates.length > 0) {
          const sortedDates = [...habit.completedDates].sort()
          let streak = 1
          let maxStreak = 1
          
          for (let i = 1; i < sortedDates.length; i++) {
            const prevDate = new Date(sortedDates[i - 1])
            const currDate = new Date(sortedDates[i])
            
            if (differenceInDays(currDate, prevDate) === 1) {
              streak++
            } else {
              streak = 1
            }
            
            maxStreak = Math.max(maxStreak, streak)
          }
          
          longestStreak = Math.max(longestStreak, maxStreak)
          
          if (habit.completedDates.includes(today)) {
            let current = 1
            for (let i = 1; i <= 30; i++) {
              const checkDate = format(
                new Date(new Date().setDate(new Date().getDate() - i)),
                'yyyy-MM-dd'
              )
              if (habit.completedDates.includes(checkDate)) {
                current++
              } else {
                break
              }
            }
            currentStreak = Math.max(currentStreak, current)
          }
        }
      })
      
      const completionRate = totalPossibleCompletions > 0
        ? Math.round((totalCompletions / totalPossibleCompletions) * 100)
        : 0
      
      setStats({
        totalHabits,
        completedToday,
        currentStreak,
        longestStreak,
        completionRate
      })
    }
    
    calculateStats()
  }, [])
  
  if (!stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-muted-foreground">Loading statistics...</div>
      </div>
    )
  }
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Statistics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <span className="text-2xl font-bold">{stats.totalHabits}</span>
          </div>
          <p className="text-sm text-muted-foreground">Total Habits</p>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8 text-green-500" />
            <span className="text-2xl font-bold">{stats.completedToday}</span>
          </div>
          <p className="text-sm text-muted-foreground">Completed Today</p>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold">{stats.currentStreak}</span>
          </div>
          <p className="text-sm text-muted-foreground">Current Streak</p>
        </div>
        
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-purple-500" />
            <span className="text-2xl font-bold">{stats.longestStreak}</span>
          </div>
          <p className="text-sm text-muted-foreground">Longest Streak</p>
        </div>
      </div>
      
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Completion Rate</span>
            <span className="font-medium">{stats.completionRate}%</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${stats.completionRate}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-card border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">Tips for Success</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Start small and build consistency</li>
          <li>• Track your progress daily</li>
          <li>• Celebrate small wins</li>
          <li>• Don't break the chain!</li>
        </ul>
      </div>
    </div>
  )
}