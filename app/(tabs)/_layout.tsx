import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'dimgray',
      tabBarStyle: {
        backgroundColor: 'darkturquoise',
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
        name="Platforms"
        options={{
          title: 'Link Accounts',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
            paddingTop: 10,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        }}
      />
      <Tabs.Screen
        name="AddGames"
        options={{
          title: 'Games',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
            paddingTop: 10,
          },
          tabBarActiveTintColor: 'white',
          tabBarInactiveTintColor: 'gray',
        }}
      />
    </Tabs>
  )
}