import { View, Image, Pressable } from "react-native";
import { StyleSheet } from "react-native";
import { PlatformImages } from "@/constants/PlatformImages";
import { Platform } from '@/types/Platforms';
import GameItem from "./GameItem";
import { Colors } from "@/constants/Colors";

type Props = {
    platform: string;
    gameList: any[];
    isOpen: Record<string, boolean>;
    onToggle: () => void;
}

export default function PlatformSection({ platform, gameList, isOpen, onToggle } : Props ) {
    const typedPlatform = platform as Platform;
    
    return (
        <View style={ styles.platformView }>
            <Pressable
                style={ styles.headerView }
                onPress={onToggle}
                >
                <Image
                    source={PlatformImages[typedPlatform]} 
                    style={ styles.platformImage}
                />
            </Pressable>
            
            {isOpen[platform] && gameList.map((game) => (
                    <GameItem
                        key={game.appid}
                        game={game}
                        platform={platform}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    headerView: {
        color: 'white',
        fontSize: 18,
        width: '100%',
    },
    platformImage: {
        width: 200,
        height: 100,
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: Colors.secondary,
    },
    platformView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        marginBottom: 20
    },
})