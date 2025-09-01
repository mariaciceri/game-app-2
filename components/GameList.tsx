import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Game } from "@/types/GameTypes";
import { Colors } from "@/constants/Colors";
import GameItem from "./GameItem";

type Props = {
    games: Record<string, Game[]>;
    onDelete: (platform: string, appid: number | string ) => void;
}

export default function GameList({games, onDelete} : Props) {

    return (
        <ScrollView style={ styles.container }>
            <View style={ styles.innerView }>
                {Object.keys(games).length > 0 ? (
                    Object.entries(games).map(([platform, gameList]) => (
                        <View key={platform} style={ styles.platformContainer }>
                            <Text style={ styles.platformText }>
                                {platform}:
                            </Text>
                            
                            {gameList.map((game) => (
                                <GameItem
                                    key={game.appid}
                                    game={game}
                                    platform={platform}
                                    onDelete={onDelete}
                                    />
                            ))}
                        </View>
                    ))
                ) : (
                    <Text style={ styles.noGamesText }>No games added yet.</Text>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '90%',
        marginTop: 20,
    },
    deleteButton: {
        color: Colors.primary,
        fontWeight: "bold"
    },
    innerView: {
        marginBottom: 20,
        width: '100%',
    },
    gameItem: {
        marginVertical: 5,
        height: 100,
        width: '33%',
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 5,
    },
    gameImage: {
        width: 50,
        height: 50,
    },
    gameTitle: {
        color: Colors.dark,
    },
    noGamesText: {
        borderColor: Colors.dark,
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        backgroundColor: Colors.light,
        fontSize: 14,
        width: '100%',
    },
    platformText: {
        color: Colors.dark,
        fontSize: 18,
        width: '100%',
    },
    platformContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 20,
    }
});