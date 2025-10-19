'use client'

import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { HabitFormData } from '@/lib/types'
import { addHabit } from '@/lib/storage'

interface AddHabitFormProps {
  onHabitAdded: () => void
}

const COLORS = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16',
  '#22c55e', '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9',
  '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
  '#ec4899', '#f43f5e'
]

const ICONS = [
  '🏃', '📚', '💪', '🧘', '🎯', '💧', '🥗', '😴',
  '✍️', '🎨', '🎵', '🚀', '💡', '🌱', '🔥', '⭐'
]

export default function AddHabitForm({ onHabitAdded }: AddHabitFormProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<HabitFormData>({
    name: '',
    description: '',
    color: COLORS[0],
    icon: ICONS[0]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) return
    
    addHabit(formData)
    setFormData({
      name: '',
      description: '',
      color: COLORS[0],
      icon: ICONS[0]
    })
    setIsOpen(false)
    onHabitAdded()
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 border-2 border-dashed border-muted-foreground/25 rounded-lg text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground transition-colors flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add New Habit
      </button>
    )
  }

  return (
    <div className="bg-card border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Create New Habit</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-muted-foreground hover:text-foreground"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Habit Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Morning Exercise"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Optional description..."
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Icon</label>
          <div className="grid grid-cols-8 gap-2">
            {ICONS.map((icon) => (
              <button
                key={icon}
                type="button"
                onClick={() => setFormData({ ...formData, icon })}
                className={`p-2 text-2xl rounded-md border-2 transition-all ${
                  formData.icon === icon
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:border-muted-foreground'
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Color</label>
          <div className="grid grid-cols-9 gap-2">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setFormData({ ...formData, color })}
                className={`w-8 h-8 rounded-md border-2 transition-all ${
                  formData.color === color
                    ? 'border-foreground scale-110'
                    : 'border-border hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-md hover:bg-primary/90 transition-colors"
          >
            Create Habit
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-secondary text-secondary-foreground py-2 px-4 rounded-md hover:bg-secondary/80 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}