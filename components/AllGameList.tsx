import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { Game } from "@/types/GameTypes";
import PlatformSection from "./PlatformSection";

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
                    <Text style={{ color: 'white' }}>No games added yet.</Text>
                )}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: { 
        width: '100%',
        marginTop: 20 
    },
    outerView: { 
        marginHorizontal: 20
    },
})