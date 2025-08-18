import { useEffect, useState } from "react";
import { getGameList, removeAllGames, setGameList } from "@/utils/AsyncStorage";
import { Game } from "@/types/GameTypes";

export default function useGames() {
    const [games, setGames] = useState<Record<string, Game[]>>({});
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const storedGames = await getGameList("games");
                setGames(storedGames || {});
            } catch {
                setError("Error fetching games.");
            }
        })();
    }, []);

    const addGame = async (platform: string, game: Game) => {
        const updatedGames = {
            ...games,
            [platform]: [...(games[platform] || []), game],
        };
        setGames(updatedGames);
        await setGameList("games", updatedGames);
    };

    const deleteGame = async (platform: string, appid: number | string) => {
        const updatedGames = { ...games };
        if (updatedGames[platform]) {
            updatedGames[platform] = updatedGames[platform].filter(game => game.appid !== appid);
            if (updatedGames[platform].length === 0) {
                delete updatedGames[platform];
            }
        }
        setGames(updatedGames);
        await setGameList("games", updatedGames);
    }

    const clearGames = async () => {
        await removeAllGames();
        setGames({});
    };

    return { games, error, addGame, deleteGame, clearGames };
}
