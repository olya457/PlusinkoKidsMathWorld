import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {BlogScreen} from '../screens/BlogScreen';
import {GameScreen} from '../screens/GameScreen';
import {OnboardingScreen} from '../screens/OnboardingScreen';
import {QuizScreen} from '../screens/QuizScreen';
import {SplashScreen} from '../screens/SplashScreen';
import {TipsScreen} from '../screens/TipsScreen';
import {WallpapersScreen} from '../screens/WallpapersScreen';
import {colors} from '../theme/theme';
import {FloatingTabBar} from './FloatingTabBar';
import type {MainTabParamList, RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();

function renderFloatingTabBar(props: BottomTabBarProps) {
  return <FloatingTabBar {...props} />;
}

function MainTabs() {
  return (
    <Tabs.Navigator
      initialRouteName="Quiz"
      tabBar={renderFloatingTabBar}
      screenOptions={{
        headerShown: false,
        sceneStyle: {backgroundColor: colors.background},
      }}>
      <Tabs.Screen name="Quiz" component={QuizScreen} />
      <Tabs.Screen name="Tips" component={TipsScreen} />
      <Tabs.Screen name="Blog" component={BlogScreen} />
      <Tabs.Screen name="Game" component={GameScreen} />
      <Tabs.Screen name="Walls" component={WallpapersScreen} />
    </Tabs.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          contentStyle: {backgroundColor: colors.background},
        }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
