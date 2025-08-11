import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from '../screens/addGameTab';
import ProfileScreen from '../screens/allGamesTab';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="All Games" component={ProfileScreen} />
            <Tab.Screen name="Add Game" component={HomeScreen} />
        </Tab.Navigator>
    );
}

export default function AddGames() {
    return (
        <SafeAreaView style={{ flex:1 }}>
            <MyTabs />
        </SafeAreaView>
    );
}