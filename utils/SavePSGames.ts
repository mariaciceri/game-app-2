import { getGameList, setGameList } from "./AsyncStorage";
import { PSGamesResponse } from "@/types/GameTypes";

export default function savePSGames(games: PSGamesResponse | null) {
    if (!games || !games.games || games.games.length === 0) return;

    getGameList('games')
        .then(currentGames => {
            const updateGames = {
                ...(currentGames || {}), // Spread operator to keep existing platforms
                'PS': [...(currentGames['PS'] || []), ...(games.games || [])]
            };
            return setGameList('games', updateGames);
        })
        .catch(err => {
            console.error('Error saving PlayStation games:', err);
        })
}

// Make a check to ensure that some games were not already saved manually