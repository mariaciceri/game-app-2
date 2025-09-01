import { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, Pressable } from 'react-native';
import GameSuggestions from '@/components/GameSuggestions';
import GamePicker from '@/components/GamePicker';
import GameList from '@/components/GameList';
import useGameSuggestions from "@/hooks/useGameSuggestions";
import { Game } from "@/types/GameTypes";
import { Colors } from '@/constants/Colors';

type Props = {
    games: Record<string, Game[]>;
    addGame: (platform: string, game: Game) => void;
    deleteGame: (platform: string, appid: number | string) => void;
}

export default function AddGameScreen({ games, addGame, deleteGame }: Props ) {
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

        setError("");
        addGame(gamePlatform, game);
        setInputText("");
        setBackgroundImage("");
        setGameId(0);
        setSelectedGame("");
        setIsSuggestionsOpen(false);
        setSuggestions([]);
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
                    setIsSuggestionsOpen(true);
                }}
                style={ styles.input }
                placeholder="Enter game name"
                placeholderTextColor="gray"
                value={inputText}
                enterKeyHint='done'
            />

            {isSuggestionsOpen && (
                <>
                    <Pressable 
                        onPress={() => setIsSuggestionsOpen(false)}
                        style={ styles.clickOutside }
                    >
                    </Pressable>
                    <GameSuggestions
                        suggestions={suggestions}
                        onSelect={(game) => {
                            setInputText(game.name);
                            setBackgroundImage(game.background_image);
                        setGameId(game.id);
                        setSuggestions([]);
                        setSelectedGame('');
                    }}
                    /> 
                </>)}


            <GamePicker gamePlatform={gamePlatform} onSelect={setGamePlatform} />

            <Pressable onPress={handleAddGame}>
                <Text style={styles.addButtonText}>Add Games</Text>
            </Pressable>

            {error ? <Text style={ styles.errorText }>{error}</Text> : null} 
            
            <GameList games={games} onDelete={deleteGame}/>

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
    clickOutside: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
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