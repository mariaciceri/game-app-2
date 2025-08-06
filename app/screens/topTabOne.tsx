import { Picker } from '@react-native-picker/picker';
import { useEffect, useState } from 'react';
import { Button, Image, ScrollView, Text, TextInput, View } from 'react-native';
import GameSuggestions from '../../components/GameSuggestions';
import { getGameList, removeAllGames, setGameList } from '../../utils/AsyncStorage';

type SuggestedGame = {
    id: number;
    name: string;
    background_image: string;
}

type Game = {
    name: string;
    logo: string;
}

export default function HomeScreen() {
    const [games, setGames] = useState<Record<string, Game[]>>({});
    const [inputText, setInputText] = useState<string>('');
    const [backgroundImage, setBackgroundImage] = useState<string>('');
    const [gamePlatform, setGamePlatform] = useState<string>('Select a game');
    const [error, setError] = useState<string>('');
    const [suggestions, setSuggestions] = useState<SuggestedGame[]>([]);
    const [selectedGame, setSelectedGame] = useState<string>('');

    const addGame = async () => {
        // Validate input
        if (!inputText.trim()) {
            setError("Please enter a game name.");
            return;
        }

        if (!gamePlatform) {
            setError("Please select a game platform.");
            return;
        }

        setError("");

        // Check if the game already exists in the selected platform
        if (games[gamePlatform]) {
            if (games[gamePlatform].some(game => game.name.toLowerCase() === inputText.toLowerCase())) {
                setError("This game already exists in the selected platform.");
                return;
            }
        }
        // Add the game to the selected platform
        const updateGames = {
            ...games, // Spread operator to keep existing platforms
            [gamePlatform]: [
                ...(games[gamePlatform] || []), // Spread operator to keep existing games - [...games[gamePlatform], newGame]
                { name: inputText, logo: backgroundImage }
            ]
        };
        setGames(updateGames);
        setInputText('');
        setSelectedGame('');
        setBackgroundImage('');
        try {
            await setGameList('games', updateGames);
        }
        catch (err) {
            setError('Error saving game.');
        }
    }

    /**
     * Fetches game suggestions from RAWG API based on the input text.
     */
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (selectedGame.length === 0) {
                setSuggestions([]);
                return;
            }
            if (selectedGame.length > 3) {
                fetch(`https://us-central1-game-app-5aa9a.cloudfunctions.net/fetchSuggestions?query=${encodeURIComponent(selectedGame)}`)
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP ${res.status}`);
                    }
                    return res.json();
                })
                .then((data) => setSuggestions(data))
                .catch(() => setError('Error fetching suggestions.'));
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [selectedGame]);

    // Not gonna be here forever, just for testing purposes
    useEffect(() => {
        const fetchGames = async () => {
            try {
                setGames(await getGameList('games') || {});
            }
            catch (err) {
                setError('Error fetching games.');
            }
        }
        fetchGames();
    }, []);

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
                    setSelectedGame('');
                    setSuggestions([]);
                }}
            />

            <Picker
                selectedValue={gamePlatform}
                style={{
                    height: '30%',
                    width: '80%',
                    backgroundColor: 'black',
                    marginTop: 20 }}
                dropdownIconColor="white"
                onValueChange={(itemValue) => setGamePlatform(itemValue)}
            >
                <Picker.Item label="Select a game" value="" color='white'/>
                <Picker.Item label="Game 1" value="Game 1" color='white' />
                <Picker.Item label="Game 2" value="Game 2" color='white' />
                <Picker.Item label="Game 3" value="Game 3" color='white' />
                <Picker.Item label="Game 4" value="Game 4" color='white' />
                <Picker.Item label="Game 5" value="Game 5" color='white' />
                <Picker.Item label="Game 6" value="Game 6" color='white' />
            </Picker>

            <Button
                title="Add Games"
                color={'gray'}
                onPress={addGame}
            />

            {error ? <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text> : null}
            
            <ScrollView style={{ width: '80%', marginTop: 20 }}>
                <View style={{ marginTop: 30 }}>
                    {Object.keys(games).length > 0 ? (
                        Object.entries(games).map(([platform, gameList]) => (
                            <View key={platform} style={{ marginBottom: 20 }}>
                                <Text style={{ color: 'white', fontSize: 18 }}>{platform}:</Text>
                                {gameList.map((game, index) => (
                                    <View key={index} style={{ marginVertical: 5, alignItems: 'center' }}>
                                        <Text style={{ color: 'lightgray' }}>{game.name}</Text>
                                        <Image 
                                            source={{ uri: game.logo }} 
                                            style={{ width: 50, height: 50, marginVertical: 5 }}
                                        />
                                    </View>
                                ))}
                            </View>
                        ))
                    ) : (
                        <Text style={{ color: 'white' }}>No games added yet.</Text>
                    )}
                </View>
            </ScrollView>

            <Button 
                title="Remove All Games"
                color={'red'}
                onPress={async () => {
                    await removeAllGames();
                    setGames({});
                }}
            />
        </View>
    );
}



