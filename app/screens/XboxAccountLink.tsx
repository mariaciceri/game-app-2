import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConsoleGamesResponse } from '@/types/GameTypes';
import saveConsoleGames from '@/utils/SaveConsoleGames';
import { Colors } from '@/constants/Colors';

export default function XboxPage() {

    let [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');

    const fetchGames = async () => {
        try {
            setError('');
            const res = await fetch(`https://us-central1-game-app-5aa9a.cloudfunctions.net/fetchXboxGames?username=${encodeURIComponent(username.toLowerCase().trim())}`);
            if (!res.ok) {
                setError('Failed to fetch games. Please check your username or try again later.');
                return;
            }
            const data: ConsoleGamesResponse = await res.json();
            setUsername('');
            saveConsoleGames(data, 'Xbox');
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
                    placeholder="Insert your XBox Username"
                    placeholderTextColor={Colors.secondary}
                    onChangeText={text => {
                        setUsername(text);
                        setError('');
                    }}
                    value={username}
                />
                <Button
                    title="Fetch Games"
                    color={'gray'}
                    onPress={fetchGames}
                />
            </View>
            { error && <Text style={ styles.error }>{error}</Text>}
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


