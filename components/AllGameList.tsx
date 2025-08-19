import React from "react";
import { ScrollView, Text, View, Image, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Game } from "@/types/GameTypes";
import useGames from "@/hooks/useGames";

type Props = {
    games: Record<string, Game[]>;
}

export default function AllGameList({games} : Props) {
    const { deleteGame } = useGames();

    return (
        <ScrollView style={ styles.container }>
            <View style={ styles.outerView }>
                {Object.keys(games).length > 0 ? (
                    Object.entries(games).map(([platform, gameList]) => (
                        <View key={platform} style={ styles.platformView }>
                            <Text style={ styles.headerText }>
                                {platform}:
                            </Text>
                            
                            {gameList.map((game) => (
                                <View key={game.appid}
                                style={ styles.gameView }>
                                    <Image
                                        source={ game.logo ? { uri: game.logo } : require('@/assets/images/logo.png') }
                                        style={ styles.gameImage }
                                    />
                                    <Text style={ styles.gameName }>{game.name}</Text>
                                    <Pressable style={ styles.button }
                                        onPress={() => deleteGame(platform, game.appid)}>
                                        <Text style={ styles.buttonText }>x</Text>
                                    </Pressable>
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

const colors = {
    primary: 'darkturquoise',
    secondary: '#9356a3',
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.primary,
        fontSize: 20,
        borderRadius: 50,
    },
    container: { 
        width: '100%',
        marginTop: 20 
    },
    gameImage: { 
        width: 100,
        height: 100,
        marginVertical: 5,
        backgroundColor: colors.secondary,
        borderRadius: 10,
    },
    gameName: { 
        color: 'lightgray',
        maxWidth: 100,
        textAlign: 'center',
    },
    gameView: { 
        marginVertical: 5,
        width: '33%',
        alignItems: 'center',
    },
    headerText: { 
        color: 'white', 
        fontSize: 18,
        width: '100%',
    },
    outerView: { 
        marginHorizontal: 20
    },
    platformView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 20
    },
})