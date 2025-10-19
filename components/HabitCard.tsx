import React, { useState } from 'react';
import { Habit } from '@/types/Habit';
import HabitProgressBar from './HabitProgressBar';
import { Check, X, Flame, Calendar, Target } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onToggleComplete?: (habitId: string, date: string) => void;
  className?: string;
}

const HabitCard: React.FC<HabitCardProps> = ({ 
  habit, 
  onToggleComplete,
  className = ''
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Get today's completion status
  const today = new Date().toISOString().split('T')[0];
  const todayCompletion = habit.completions.find(c => c.date === today);
  const isCompletedToday = todayCompletion?.completed || false;
  
  // Calculate completion rate for current period
  const calculateCompletionRate = () => {
    const now = new Date();
    let startDate: Date;
    
    switch (habit.frequency) {
      case 'daily':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'weekly':
        const dayOfWeek = now.getDay();
        startDate = new Date(now);
        startDate.setDate(now.getDate() - dayOfWeek);
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'monthly':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
    }
    
    const relevantCompletions = habit.completions.filter(
      c => new Date(c.date) >= startDate
    );
    
    const completedCount = relevantCompletions.filter(c => c.completed).length;
    const totalDays = relevantCompletions.length;
    
    return totalDays > 0 ? (completedCount / totalDays) * 100 : 0;
  };
  
  // Handle toggle completion with loading state
  const handleToggleComplete = async () => {
    if (isUpdating || !onToggleComplete) return;
    
    setIsUpdating(true);
    try {
      await onToggleComplete(habit.id, today);
    } catch (error) {
      console.error('Failed to toggle habit completion:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const completionRate = calculateCompletionRate();
  const habitColor = habit.color || '#3b82f6';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all hover:shadow-md ${className}`}
      role="article"
      aria-labelledby={`habit-name-${habit.id}`}
    >
      {/* Header with name and completion toggle */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 
            id={`habit-name-${habit.id}`}
            className="text-lg font-semibold text-gray-900 flex items-center gap-2"
          >
            {habit.icon && <span className="text-xl">{habit.icon}</span>}
            {habit.name}
          </h3>
          {habit.description && (
            <p className="text-sm text-gray-600 mt-1">{habit.description}</p>
          )}
        </div>
        
        <button
          onClick={handleToggleComplete}
          disabled={isUpdating}
          className={`
            p-2 rounded-full transition-all transform active:scale-95
            ${isCompletedToday 
              ? 'bg-green-500 text-white hover:bg-green-600' 
              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
            }
            ${isUpdating ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          aria-label={isCompletedToday ? 'Mark as incomplete' : 'Mark as complete'}
          aria-pressed={isCompletedToday}
        >
          {isUpdating ? (
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          ) : isCompletedToday ? (
            <Check className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="mb-3">
        <HabitProgressBar 
          current={completionRate}
          target={100}
          color={habitColor}
        />
        <p className="text-xs text-gray-500 mt-1">
          {completionRate.toFixed(0)}% completion rate this {habit.frequency.slice(0, -2)}
        </p>
      </div>
      
      {/* Stats row */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          {/* Current streak */}
          <div className="flex items-center gap-1 text-orange-600">
            <Flame className="w-4 h-4" />
            <span className="font-medium">{habit.currentStreak}</span>
            <span className="text-gray-500">day streak</span>
          </div>
          
          {/* Best streak */}
          {habit.bestStreak > 0 && (
            <div className="flex items-center gap-1 text-gray-500">
              <Target className="w-4 h-4" />
              <span>Best: {habit.bestStreak}</span>
            </div>
          )}
        </div>
        
        {/* Frequency indicator */}
        <div className="flex items-center gap-1 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span className="capitalize">{habit.frequency}</span>
        </div>
      </div>
      
      {/* Target count indicator */}
      {habit.targetCount > 1 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Target: {habit.targetCount} times per {habit.frequency.slice(0, -2)}
          </p>
        </div>
      )}
    </div>
  );
};

export default HabitCard;