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
            <StatusBar backgroundColor={Colors.primary} />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: Colors.primary,
                    tabBarInactiveTintColor: "gray",
                    tabBarStyle: {
                backgroundColor: Colors.secondary,
                },
                tabBarLabelStyle: { 
                    fontWeight: 'bold',
                    fontSize: 16,
                },
                tabBarIndicatorStyle: {
                        backgroundColor: Colors.primary,
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
        <SafeAreaView style={{ flex:1, backgroundColor: Colors.secondary }}>
            <MyTabs />
        </SafeAreaView>
    );
}