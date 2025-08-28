import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import HomeScreen from '../screens/addGameTab';
import ProfileScreen from '../screens/allGamesTab';
import { Colors } from '@/constants/Colors';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <>
            <StatusBar backgroundColor={Colors.light} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: Colors.secondary,
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                backgroundColor: Colors.primary,
                },
                tabBarLabelStyle: { 
                    fontWeight: 'bold',
                    fontSize: 16,
                },
                tabBarIndicatorStyle: {
                        backgroundColor: Colors.secondary,
                    },
            }}>
                <Tab.Screen name="All Games" component={ProfileScreen} />
                <Tab.Screen name="Add Game" component={HomeScreen} />
            </Tab.Navigator>
        </>
    );
}

export default function Games() {
    return (
        <SafeAreaView style={{ flex:1, backgroundColor: Colors.primary }}>
            <MyTabs />
        </SafeAreaView>
    );
}