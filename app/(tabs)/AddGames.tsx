import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";
import { SafeAreaView } from "react-native";
import HomeScreen from '../screens/topTabOne';
import ProfileScreen from '../screens/topTabTwo';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
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