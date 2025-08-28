import { getAccountInfo, setGameList } from "./AsyncStorage";
import { ConsoleGamesResponse } from "@/types/GameTypes";

export default function saveConsoleGames(games: ConsoleGamesResponse | null, platform: string) {
    if (!games || !games.games || games.games.length === 0) return;

    getAccountInfo('games')
        .then(currentGames => {
            const updateGames = {
                ...(currentGames || {}), // Spread operator to keep existing platforms
                [platform]: [
                    ...(currentGames?.[platform] || []),
                    ...(games.games)]
            };
            return setGameList('games', updateGames);
        })
        .catch(err => {
            console.error('Error saving Console games:', err);
        })
}

// TODO: Make a check to ensure that some games were not already saved manually