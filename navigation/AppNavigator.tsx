import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import { AuthStack } from '../screens/AuthStack';
import { MainStack } from '../screens/MainStack';
import { LoadingScreen } from '../components/LoadingScreen';
import { ErrorBoundary } from '../components/ErrorBoundary';

export function AppNavigator() {
  const { user, loading, error } = useAuth();
  const [isReady, setIsReady] = useState(false);

  // Ensure navigation container is ready before rendering
  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load any required resources here
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsReady(true);
      } catch (e) {
        console.error('Navigation preparation error:', e);
        setIsReady(true);
      }
    };

    prepare();
  }, []);

  // Show loading screen while checking auth state
  if (!isReady || loading) {
    return <LoadingScreen />;
  }

  // Handle authentication errors
  if (error) {
    console.error('Authentication error:', error);
    // In production, you might want to show a more user-friendly error screen
    return <AuthStack />;
  }

  return (
    <ErrorBoundary>
      <NavigationContainer>
        {user ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </ErrorBoundary>
  );
}