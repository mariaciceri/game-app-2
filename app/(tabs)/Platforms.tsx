import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";
import { SafeAreaView } from "react-native";
import SteamPage from '../screens/SteamPage';
import PlayStationPage from '../screens/PlayStationTab';
import XboxPage from '../screens/XboxTab';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Steam" component={SteamPage} />
            <Tab.Screen name="PlayStation Games" component={PlayStationPage} />
            <Tab.Screen name="Xbox Games" component={XboxPage} />
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