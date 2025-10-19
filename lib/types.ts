export interface Habit {
  id: string
  name: string
  description?: string
  createdAt: string
  completedDates: string[]
  color: string
  icon: string
}

export interface HabitFormData {
  name: string
  description?: string
  color: string
  icon: string
}

export interface HabitStats {
  totalHabits: number
  completedToday: number
  currentStreak: number
  longestStreak: number
  completionRate: number
}