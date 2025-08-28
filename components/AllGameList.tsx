import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Game } from "@/types/GameTypes";
import PlatformSection from "./PlatformSection";
import { Colors } from "@/constants/Colors";

type Props = {
    games: Record<string, Game[]>;
}

export default function AllGameList({games} : Props) {
    const [isOpen, setIsOpen] = useState<Record<string, boolean>>({'PS': false, 'Steam': false, 'XBox': false});

    return (
        <ScrollView style={ styles.container }>
            <View style={ styles.outerView }>
                {Object.keys(games).length > 0 ? (
                    Object.entries(games).map(([platform, gameList]) => {
                        return (
                            <PlatformSection
                                key={platform}
                                platform={platform}
                                gameList={gameList}
                                isOpen={isOpen}
                                onToggle={() => setIsOpen({ ...isOpen, [platform]: !isOpen[platform] })}                            
                            />
                        )
                    })
                ) : (
                    <Text style={ styles.noGamesText}>
                        No games added yet. Go to 'Link Accounts' tab to connect your gaming accounts 
                        and retrieve your games or to 'Add Game' tab to add games manually.
                    </Text>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { 
        width: '100%',
        marginTop: 20,
    },
    noGamesText: {
        borderColor: Colors.dark,
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        margin: 10,
        backgroundColor: Colors.light,
        fontSize: 14,
    },
    outerView: { 
        marginHorizontal: 20
    },
})