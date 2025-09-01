import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import AddGameScreen from '../screens/addGameTab';
import { Colors } from '@/constants/Colors';
import AllGamesScreen from '../screens/allGamesTab';
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
                <Tab.Screen name="All Games" component={AllGamesScreen} />
                <Tab.Screen name="Add Game" component={AddGameScreen} />
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