
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SteamGamesResponse } from "@/types/GameTypes";
import saveSteamGames from "@/utils/SaveSteamGames";
import { Colors } from "@/constants/Colors";

export default function SteamPage() {

    let [userId, setUserId] = useState<string>('');
    const [error, setError] = useState<string>('');

    //TODO : Add a loading state to show a spinner while fetching games
    const fetchGames = async() => {
        try {
            setError('');
            const res = await fetch(`https://us-central1-game-app-5aa9a.cloudfunctions.net/fetchSteamGames?vanityurl=${encodeURIComponent(userId.toLowerCase().trim())}`)
            if (!res.ok) {
                setError('Failed to fetch games. Please check your Steam ID or try again later.');
                return;
            }
            const data: SteamGamesResponse = await res.json();
            saveSteamGames(data);
            setUserId('');
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching games. Please try again later.');
        }
    }

    return (
        <>
            <View style={styles.gamesContainer}>
                <TextInput 
                    style={styles.textInput}
                    placeholder="Insert your Steam Account Id"
                    placeholderTextColor={Colors.secondary}
                    onChangeText={text => {
                        setUserId(text);
                        setError('');
                    }}
                    value={userId}
                />
                <Button
                    title="Fetch Games"
                    color={'gray'}
                    onPress={fetchGames}
                />
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        paddingHorizontal: 15,
    },
    gamesContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        minWidth: '100%',
        color: Colors.dark,
        paddingHorizontal: 10
    },
});