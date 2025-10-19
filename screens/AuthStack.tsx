'use client';

import { useState } from 'react';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

type AuthView = 'login' | 'register';

export default function AuthStack() {
  const [currentView, setCurrentView] = useState<AuthView>('login');

  const switchToRegister = () => {
    setCurrentView('register');
  };

  const switchToLogin = () => {
    setCurrentView('login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {currentView === 'login' ? (
          <LoginScreen onSwitchToRegister={switchToRegister} />
        ) : (
          <RegisterScreen onSwitchToLogin={switchToLogin} />
        )}
      </div>
    </div>
  );
}