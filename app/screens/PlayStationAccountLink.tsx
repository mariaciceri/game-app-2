import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, Text, View } from "react-native";
import { ConsoleGamesResponse } from '@/types/GameTypes';
import { Colors } from '@/constants/Colors';
import saveConsoleGames from '@/utils/SaveConsoleGames';
import useFetchUserAccount from '@/hooks/fetchUserAccount';
import { useGamesContext } from '@/context/GameContext';

//TODO: maybe a clickable to go see the games in games page.

export default function PlayStationPage() {
    let [username, setUsername] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { connectedUser, setConnectedUser, linked, setLinked } = useFetchUserAccount('PS');
    const { saveGames, saveAccountInfo, unlinkAccountInfo, deletePlatformGames } = useGamesContext();

    const fetchGames = async() => {
        try {
            setError('');
            const res = await fetch(`https://us-central1-game-app-5aa9a.cloudfunctions.net/fetchPSGames?username=${encodeURIComponent(username.toLowerCase().trim())}`);
            if (!res.ok) {
                setError('Failed to fetch games. Please check your username or try again later.');
                return;
            }
            const data: ConsoleGamesResponse = await res.json();
            setConnectedUser(username);
            setUsername('');
            setLinked(true);
            const updatedGames = await saveConsoleGames(data, 'PS');
            await saveGames(updatedGames);
            saveAccountInfo(username, 'PS');
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
                {!linked && (
                    <Button
                        title="Fetch Games"
                        color={'gray'}
                        onPress={fetchGames}
                    />
                )}
                {linked && (
                    <>
                        <Text style={styles.linkedText}>You are linked as {connectedUser}</Text>
                        <Button
                            title="Unlink Account"
                            color={'gray'}
                            onPress={() => {
                                unlinkAccountInfo('PS');
                                setConnectedUser('');
                                setLinked(false);
                                deletePlatformGames('PS');
                            }}
                        />
                    </>
                )}
            </View>
            <View>
                {error &&
                    (<Text style={ styles.error }>{error}</Text>)
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
    linkedText: {
        color: Colors.secondary,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        minWidth: '100%',
        color: Colors.dark,
        paddingHorizontal: 10
    },
});


