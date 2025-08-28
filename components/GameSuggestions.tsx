import React from "react";
import { Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { GameRAWGSuggested } from "@/types/GameTypes";

type Props = {
    suggestions: GameRAWGSuggested[];
    onSelect: (game: GameRAWGSuggested) => void;
}

export default function GameSuggestions( { suggestions, onSelect } : Props ) {
    if ( suggestions.length === 0 ) return null;

    return (
        <ScrollView key={1} style={{ width: '90%', marginTop: 10, maxHeight: '40%',
            position: 'absolute', top: 125, backgroundColor: 'white', borderColor: 'gray', borderWidth: 1, 
            borderRadius: 5, zIndex: 99 }}
            contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            {suggestions.map(game => (
                <TouchableOpacity 
                key={game.id} 
                onPress={() => onSelect(game)}
                style={{ width: '38%', margin: 10 }}>
                    <Image source={{ uri: game.background_image }} style={{ width: '100%', height: 75 }} />
                    <Text style={{ color: 'gray' }}>{game.name}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    )
}