import { getAccountInfo } from "./AsyncStorage";
import { SteamGamesResponse } from "@/types/GameTypes";
import { Game } from "@/types/GameTypes";

export default async function saveSteamGames(
    games: SteamGamesResponse | null
): Promise<Record<string, Game[]>> {
    if (!games || !games.games || games.games.length === 0) return {};

    const formattedGames = games.games.map(game => ({
        appid: game.appid,
        name: game.name,
        logo: `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`
    }));

    try {
        const currentGames = await getAccountInfo("games");
        const updatedGames = {
            ...(currentGames || {}),
            Steam: formattedGames,
        };
        return updatedGames;
    } catch (err) {
        console.error("Error saving Steam games:", err);
        return {};
    }
}

