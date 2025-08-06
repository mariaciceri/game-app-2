
import React, { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Game = {
    appid: number;
    name: string;
}

type GamesResponse = {
    games: Game[];
}

function renderGames(gamesOwned: GamesResponse | null): React.ReactNode {
    if (!gamesOwned || !gamesOwned.games || gamesOwned.games.length === 0) {
        return <View><Text style={{color: 'white'}}>No games found.</Text></View>;
    }
    return (
    <View style={styles.outerImageContainer}>
        {gamesOwned.games.map(game => (
            <View key={game.appid} style={styles.imageContainer}>
                <Image
                    style={styles.gameImage}
                    source={{uri: `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`}}
                />
                <Text style={styles.gameName}>{game.name}</Text>
            </View>
        ))}
    </View>
    )
}

function afterFetchingGames(userGames: GamesResponse | null, error: string): React.ReactNode {
    return (
    <View style={styles.gamesOwnedContainer}>
        {error ? (
            <Text style={{ color: 'red' }}>{error}</Text>
        ) : (
            renderGames(userGames)
        )}
    </View>
    )
}

export default function SteamPage() {

    let [userId, setUserId] = useState<string>('');
    const [userGames, setGames] = useState<GamesResponse | null>(null);
    const [error, setError] = useState<string>('');

    
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
                    placeholder="Insert your Steam Account Id"
                    placeholderTextColor="lightgray"
                    onChangeText={text => {
                        setUserId(text.toLowerCase().trim());
                    }}
                    value={userId}
                />
                <Button
                    title="Fetch Games"
                    color={'gray'}
                    onPress={() => {
                        setError('');
                        setGames(null);
                        fetch(`https://us-central1-game-app-5aa9a.cloudfunctions.net/fetchSteamGames?vanityurl=${encodeURIComponent(userId)}`)
                            .then(res => {
                            if (!res.ok) {
                                throw new Error(`HTTP ${res.status}`)};
                            return res.json();
                        })
                        .then(data => {setGames(data)
                        console.log('data', data);})
                        .catch(err => {
                            setError('Failed to fetch games. Please try again later.');
                        })
                        .finally(() => setUserId(''))
                    }}
                />
            </View>
            <ScrollView style={styles.scrollContent}>
                {userGames || error ? afterFetchingGames(userGames, error) : null }
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'black',
        height: "100%",
        width: "100%",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
        opacity: 0.2,
        zIndex: -1,
    },
    imageContainer: {
        width: '48%',
        height: 100,
    },
    gamesContainer: {
        padding: '10%',
    },
    gameImage: {
        height: '90%',
    },
    gameName: { 
        color: 'white',
        fontSize: 15,
        position: 'absolute',
        width: '70%',
        zIndex: -1,
    },
    gamesOwnedContainer: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 10,
    },
    outerImageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
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