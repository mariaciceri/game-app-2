import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import AddGameScreen from '../screens/addGameTab';
import { Colors } from '@/constants/Colors';
import AllGamesScreen from '../screens/allGamesTab';
import useGames from '@/hooks/useGames';
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    const { games, addGame, deleteGame, clearGames } = useGames();
    
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
                <Tab.Screen name="All Games">
                    {() => <AllGamesScreen games={games} deleteGame={deleteGame} />}
                </Tab.Screen>
                <Tab.Screen name="Add Game">
                    {() => <AddGameScreen games={games} addGame={addGame} deleteGame={deleteGame} />}
                </Tab.Screen>
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