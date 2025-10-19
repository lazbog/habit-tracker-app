'use client';

import { Habit } from './types'

const STORAGE_KEY = 'habit-tracker-data'

export function loadHabits(): Habit[] {
  if (typeof window === 'undefined') return []
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Failed to load habits:', error)
    return []
  }
}

export function saveHabits(habits: Habit[]): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
  } catch (error) {
    console.error('Failed to save habits:', error)
  }
}

export function addHabit(habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>): Habit {
  const newHabit: Habit = {
    ...habit,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    completedDates: []
  }
  
  const habits = loadHabits()
  habits.push(newHabit)
  saveHabits(habits)
  
  return newHabit
}

export function updateHabit(id: string, updates: Partial<Habit>): Habit | null {
  const habits = loadHabits()
  const index = habits.findIndex(h => h.id === id)
  
  if (index === -1) return null
  
  habits[index] = { ...habits[index], ...updates }
  saveHabits(habits)
  
  return habits[index]
}

export function deleteHabit(id: string): boolean {
  const habits = loadHabits()
  const filteredHabits = habits.filter(h => h.id !== id)
  
  if (filteredHabits.length === habits.length) return false
  
  saveHabits(filteredHabits)
  return true
}

export function toggleHabitCompletion(id: string, date: string): Habit | null {
  const habits = loadHabits()
  const habit = habits.find(h => h.id === id)
  
  if (!habit) return null
  
  const dateIndex = habit.completedDates.indexOf(date)
  
  if (dateIndex > -1) {
    habit.completedDates.splice(dateIndex, 1)
  } else {
    habit.completedDates.push(date)
    habit.completedDates.sort()
  }
  
  saveHabits(habits)
  return habit
}