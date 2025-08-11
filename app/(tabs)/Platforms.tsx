import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";
import { SafeAreaView } from "react-native";
import SteamPage from '../screens/SteamPage';
import EpicGamesPage from '../screens/EpicGamesPage';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Steam" component={SteamPage} />
            <Tab.Screen name="Epic Games" component={EpicGamesPage} />
        </Tab.Navigator>
    );
}

export default function AddGames() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <MyTabs />
        </SafeAreaView>
    );
}