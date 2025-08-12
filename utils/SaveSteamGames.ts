import { getGameList, setGameList } from "./AsyncStorage";
import { SteamGamesResponse } from "@/types/GameTypes";

export default function saveSteamGames(games: SteamGamesResponse | null) {
    if (!games || !games.games || games.games.length === 0) return;

    const formattedGames = games.games.map(game => ({
        appid: game.appid,
        name: game.name,
        logo: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`
    }));

    getGameList('games')
        .then(currentGames => {
            const updateGames = {
                ...(currentGames || {}), // Spread operator to keep existing platforms
                'Steam': formattedGames
            };
            return setGameList('games', updateGames);
        })
        .catch(err => {
            console.error('Error saving Steam games:', err);
        })
}

