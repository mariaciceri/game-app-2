import React from "react";
import { ScrollView, Text, View, Image, Button } from "react-native";
import { Game } from "@/types/GameTypes";
import useGames from "@/hooks/useGames";

type Props = {
    games: Record<string, Game[]>;
    setAddedGames: React.Dispatch<React.SetStateAction<Record<string, Game[]>>>;
}

export default function GameList({games, setAddedGames} : Props) {
    const { deleteGame } = useGames();

    const handleDelete = (platform: string, appid: number | string) => {
        deleteGame(platform, appid);

        setAddedGames(prev => {
            const updated = {
                ...prev,
                [platform]: (prev[platform] || []).filter(game => game.appid !== appid)
            };

            if (updated[platform].length === 0) {
                delete updated[platform];
            }

            return updated;
        });
    };


    return (
        <ScrollView style={{ width: '80%', marginTop: 20 }}>
            <View style={{ marginTop: 30 }}>
                {Object.keys(games).length > 0 ? (
                    Object.entries(games).map(([platform, gameList]) => (
                        <View key={platform} style={{ marginBottom: 20 }}>
                            <Text style={{ color: 'white', fontSize: 18 }}>
                                {platform}:
                            </Text>
                            
                            {gameList.map((game) => (
                                <View key={game.appid}
                                style={{ marginVertical: 5, alignItems: 'center' }}>
                                    <Text style={{ color: 'lightgray' }}>{game.name}</Text>
                                    <Image
                                        source={ game.logo ? { uri: game.logo } : require('@/assets/images/logo.png') }
                                        style={{ width: 50, height: 50, marginVertical: 5 }}
                                    />
                                    <Button title="X"
                                        key={game.appid}
                                        onPress={() => handleDelete(platform, game.appid) } />
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