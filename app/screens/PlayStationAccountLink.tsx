import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View } from "react-native";
import { ConsoleGamesResponse } from '@/types/GameTypes';
import { Colors } from '@/constants/Colors';
import saveConsoleGames from '@/utils/SaveConsoleGames';


//TODO: include feedback message if successfully linked, maybe a clickable to go see the games in games page.
//TODO: unlink the account button to appear if theres an account registered

export default function PlayStationPage() {
    let [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');

    const fetchGames = async() => {
        try {
            setError('');
            const res = await fetch(`https://us-central1-game-app-5aa9a.cloudfunctions.net/fetchPSGames?username=${encodeURIComponent(username.toLowerCase().trim())}`);
            if (!res.ok) {
                setError('Failed to fetch games. Please check your username or try again later.');
                return;
            }
            const data: ConsoleGamesResponse = await res.json();
            setUsername('');
            saveConsoleGames(data, 'PS');
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
                    placeholder="Insert your PSN Username"
                    placeholderTextColor={Colors.secondary}
                    onChangeText={(text => {
                        setUsername(text);
                        setError('');
                    })}
                    value={username}
                />
                <Button
                    title="Fetch Games"
                    color={'gray'}
                    onPress={fetchGames}
                />
            </View>
            <View>
                {error &&
                    (<Text style={ styles.error}>{error}</Text>)
                }
            </View>
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


