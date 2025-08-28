import { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import GameSuggestions from '@/components/GameSuggestions';
import GamePicker from '@/components/GamePicker';
import GameList from '@/components/GameList';
import useGameSuggestions from "@/hooks/useGameSuggestions";
import useGames from "@/hooks/useGames";
import { Game } from "@/types/GameTypes";
import { Colors } from '@/constants/Colors';

export default function HomeScreen() {
    const { games, addGame, clearGames } = useGames();
    const [addedGames, setAddedGames] = useState<Record<string, Game[]>>({});
    const [inputText, setInputText] = useState<string>('');
    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const [gameId, setGameId] = useState<number>(0);
    const [gamePlatform, setGamePlatform] = useState<string>('Select a game');
    const [error, setError] = useState<string>('');
    const [selectedGame, setSelectedGame] = useState<string>('');
    const { suggestions, setSuggestions } = useGameSuggestions(selectedGame);
    const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(true);

    const handleAddGame = () => {
        if (!inputText.trim()) return setError("Please enter a game name.");
        if (!gamePlatform) return setError("Please select a game platform.");
        if (games[gamePlatform]?.some((g) => g.name.toLowerCase() === inputText.toLowerCase()))
            return setError("This game already exists."); 

        const finalGameId = gameId || Date.now();
        const game: Game = { appid: Number(finalGameId), name: inputText, logo: backgroundImage }
        const addedGame = {
            ...addedGames,
            [gamePlatform]: [...(addedGames[gamePlatform] || []), game]
        };

        setError("");
        addGame(gamePlatform, game);
        setAddedGames(addedGame);
        setInputText("");
        setBackgroundImage("");
        setGameId(0);
        setSelectedGame("");
    };

    return (
        <View style={ styles.container }>
            <Text style={ styles.title }>
                Welcome to the Home Screen!
            </Text>
            
            <TextInput 
                onChangeText={(text) => {
                    setInputText(text);
                    setSelectedGame(text);
                }}
                style={ styles.input }
                placeholder="Enter game name"
                placeholderTextColor="gray"
                value={inputText}
                enterKeyHint='done'
            />

            {isSuggestionsOpen && (
                <GameSuggestions
                    suggestions={suggestions}
                    onSelect={(game) => {
                        setInputText(game.name);
                        setBackgroundImage(game.background_image);
                    setGameId(game.id);
                    setSuggestions([]);
                    setSelectedGame('');
                }}
            /> )}


            <GamePicker gamePlatform={gamePlatform} onSelect={setGamePlatform} />

            <Pressable onPress={handleAddGame}>
                <Text style={styles.addButtonText}>Add Games</Text>
            </Pressable>

            {error ? <Text style={ styles.errorText }>{error}</Text> : null} 
            
            <GameList games={addedGames} setAddedGames={setAddedGames}/>

            {/* <Button title="Remove All Games" color={'red'} onPress={clearGames} /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    addButtonText: {
        color: Colors.primary,
        fontSize: 18,
        marginVertical: 20,
        borderColor: Colors.primary,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
    },
    container: { 
        flex: 1,
        backgroundColor: "white",
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorText: { 
        color: 'red', 
        marginTop: 10 
    },
    input: {
        width: '90%',
        height: 40,
        borderColor: Colors.dark,
        borderWidth: 1,
        color: Colors.secondary,
        paddingHorizontal: 10,
        marginTop: 20,
        borderRadius: 5,
    },
    title: { 
        color: Colors.dark, 
        fontSize: 20, 
        textAlign: 'center', 
        marginVertical: 25,
    }
});