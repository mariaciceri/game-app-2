import { Image, StyleSheet, Text, View } from "react-native";
import { ConsoleGamesResponse } from "@/types/GameTypes";


export default function renderGames(gamesOwned: ConsoleGamesResponse | null): React.ReactNode {
    if (!gamesOwned || !gamesOwned.games || gamesOwned.games.length === 0) {
        return (
            <View>
                <Text style={{ color: 'white' }}>No games found.</Text>
            </View>
        )
    }
    return (
        <View style={styles.outerImageContainer}>
            {gamesOwned.games.map(game => (
                <View key={game.appid} style={styles.imageContainer}>
                    <Image
                        style={styles.gameImage}
                        source={{ uri: game.logo }}
                    />
                    <Text style={styles.gameName}>{game.name}</Text>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
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
    imageContainer: {
        width: '48%',
        height: 200,
    },
    outerImageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
})