import { getAccountInfo } from "./AsyncStorage";
import { ConsoleGamesResponse } from "@/types/GameTypes";
import { Game } from "@/types/GameTypes";

export default async function saveConsoleGames(
    games: ConsoleGamesResponse | null, platform: string
): Promise<Record<string, Game[]>> {
    if (!games || !games.games || games.games.length === 0) return {};

    try {
        const currentGames = await getAccountInfo("games");
        const updatedGames = {
            ...(currentGames || {}), // Spread operator to keep existing platforms
            [platform]: [
                ...(currentGames?.[platform] || []),
                ...(games.games)]
        };
        return updatedGames;
    }
    catch (err) {
        console.error("Error saving Console games:", err);
        return {};
    }
}

// TODO: Make a check to ensure that some games were not already saved manually