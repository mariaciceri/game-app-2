import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { GamesProvider } from '@/context/GameContext';

export default function TabLayout() {

  return (
    <GamesProvider>
      <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.dark,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: Colors.primary,
          position: 'absolute',
          paddingTop: 10,
          borderTopWidth: 0,
        },
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
          }}
        />
        <Tabs.Screen
          name="Accounts"
          options={{
            title: 'Link Accounts',
            tabBarStyle: {
              backgroundColor: Colors.primary,
              borderTopWidth: 0,
              paddingTop: 10,
            },
            tabBarActiveTintColor: Colors.dark,
            tabBarInactiveTintColor: 'gray',
          }}
        />
        <Tabs.Screen
          name="Games"
          options={{
            title: 'Games',
            tabBarStyle: {
              backgroundColor: Colors.primary,
              borderTopWidth: 0,
              paddingTop: 10,
            },
            tabBarActiveTintColor: Colors.dark,
            tabBarInactiveTintColor: 'gray',
          }}
        />
      </Tabs>
    </GamesProvider>
  )
}