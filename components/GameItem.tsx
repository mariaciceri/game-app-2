import { Text, View, Image, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { Game } from "@/types/GameTypes";
import { Colors } from "@/constants/Colors";

type Props = {
    game: Game;
    platform: string;
    onDelete: (platform: string, appid: number | string ) => void;}

export default function GameItem({ game, platform , onDelete}: Props) {

    return (
        <View style={ styles.gameView }>
            <Image
                source={ game.logo ? { uri: game.logo } : require('@/assets/images/logo.png') }
                style={ styles.gameImage }
            />
            <Text style={ styles.gameName }>{ game.name }</Text>
            <Pressable style={ styles.button }
                onPress={() => onDelete(platform, game.appid)}>
                <Text style={ styles.buttonText }>x</Text>
            </Pressable>
        </View>
    )
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
        color: Colors.primary,
        fontSize: 20,
        borderRadius: 50,
    },
    gameImage: {
        width: 100,
        height: 100,
        marginVertical: 5,
        backgroundColor: Colors.secondary,
        borderRadius: 10,
    },
    gameName: {
        color: Colors.dark,
        maxWidth: 100,
        textAlign: 'center',
    },
    gameView: {
        marginVertical: 5,
        width: '33%',
        alignItems: 'center',
    },
})
