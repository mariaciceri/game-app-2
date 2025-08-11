import React from "react";
import { ScrollView, Text, View, Image } from "react-native";

type Game = {
    appid: string;
    name: string;
    logo: string;
}

type Props = {
    games: Record<string, Game[]>;
}

export default function GameList({games} : Props) {
    return (
        <ScrollView style={{ width: '80%', marginTop: 20 }}>
            <View style={{ marginTop: 30 }}>
                {Object.keys(games).length > 0 ? (
                    Object.entries(games).map(([platform, gameList]) => (
                        <View key={platform} style={{ marginBottom: 20 }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>{platform}:</Text>
                            {gameList.map((game) => (
                                <View key={game.appid} style={{ marginVertical: 5, alignItems: 'center' }}>
                                    <Text style={{ color: 'lightgray' }}>{game.name}</Text>
                                    <Image
                                        source={{ uri: game.logo }}
                                        style={{ width: 50, height: 50, marginVertical: 5 }}
                                    />
                                </View>
                            ))}
                        </View>
                    ))
                ) : (
                    <Text style={{ color: 'white' }}>No games added yet.</Text>
                )}
            </View>
        </ScrollView>
    )
}