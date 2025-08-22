import React, { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ConsoleGamesResponse } from '@/types/GameTypes';
import renderGames from '@/components/ConsoleGameList';
import saveConsoleGames from '@/utils/SaveConsoleGames';

export default function XboxPage() {

    let [username, setUsername] = useState<string>('');
    const [userGames, setGames] = useState<ConsoleGamesResponse | null>(null);
    const [error, setError] = useState<string>('');

    const fetchGames = async () => {
        try {
            setError('');
            const res = await fetch(`https://us-central1-game-app-5aa9a.cloudfunctions.net/fetchXboxGames?username=${encodeURIComponent(username)}`);
            if (!res.ok) {
                setError('Failed to fetch games. Please check your username or try again later.');
                return;
            }
            const data: ConsoleGamesResponse = await res.json();
            setGames(data);
            setUsername('');
            saveConsoleGames(data, 'Xbox');
        } catch (err) {
            console.error(err);
            setError('An error occurred while fetching games. Please try again later.');
        }
    }

    const renderContent = () => {
        if (error) {
            return <Text style={{ color: 'red' }}>{error}</Text>;
        }
        return renderGames(userGames);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={require('../../assets/images/background-second.jpg')}
                style={styles.backgroundImage}
                resizeMode="stretch"
            />
            <View style={styles.gamesContainer}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Insert your XBox Username"
                    placeholderTextColor="lightgray"
                    onChangeText={text => {
                        setUsername(text.toLowerCase().trim());
                    }}
                    value={username}
                />
                <Button
                    title="Fetch Games"
                    color={'gray'}
                    onPress={fetchGames}
                />
            </View>
            <ScrollView style={styles.scrollContent}>
                {(userGames || error) &&
                    (<View>{renderContent()}</View>)
                }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        opacity: 0.2,
        zIndex: -1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'black',
        height: "100%",
        width: "100%",
    },
    gamesContainer: {
        padding: '10%',
    },
    gamesOwnedContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10,
    },
    textInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: '100%',
        minWidth: '100%',
        color: 'white',
        paddingHorizontal: 10
    },
    scrollContent: {
        flex: 1,
        padding: 15,
        height: '100%',
        width: '100%',
    },
});


