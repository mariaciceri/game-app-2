import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import GameSuggestions from '@/components/GameSuggestions';
import GamePicker from '@/components/GamePicker';
import GameList from '@/components/GameList';
import useGameSuggestions from "@/hooks/useGameSuggestions";
import useGames from "@/hooks/useGames";
import { Game } from "@/types/GameTypes";

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
        <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center', marginBottom: 20 }}>
                Welcome to the Home Screen!
            </Text>
            <TextInput 
                onChangeText={(text) => {
                    setInputText(text);
                    setSelectedGame(text);
                }}
                style={{ width: '80%',
                    height: 40,
                    borderColor: 'gray',
                    borderWidth: 1,
                    color: 'white',
                    paddingHorizontal: 10,
                    marginTop: 20 }}
                placeholder="Enter game name"
                placeholderTextColor="gray"
                value={inputText}
                enterKeyHint='done'
            />

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

            <GamePicker gamePlatform={gamePlatform} onSelect={setGamePlatform} />

            <Button title="Add Games" color={'gray'} onPress={handleAddGame} />

            {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
            
            <GameList games={addedGames} setAddedGames={setAddedGames}/>

            <Button title="Remove All Games" color={'red'} onPress={clearGames} />
        </View>
    );
}



