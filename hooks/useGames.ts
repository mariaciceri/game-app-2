import { useEffect, useState } from "react";
import { getAccountInfo, removeAllGames, setGameList } from "@/utils/AsyncStorage";
import { Game } from "@/types/GameTypes";

export default function useGames() {
    const [games, setGames] = useState<Record<string, Game[]>>({});
    const [error, setError] = useState("");

    useEffect(() => {
        loadGames();
    }, []);

    const loadGames = async () => {
        try {
            const storedGames = await getAccountInfo("games");
            setGames(storedGames || {});
        } catch {
            setError("Error fetching games.");
        }
    }

    const saveGames = async (updatedGames: Record<string, Game[]>) => {
        try {
            await setGameList("games", updatedGames);
            setGames(updatedGames);
        } catch {
            setError("Error saving games.");
        }
    }

    const addGame = async (platform: string, game: Game) => {
        const updatedGames = {
            ...games,
            [platform]: [...(games[platform] || []), game],
        };
        saveGames(updatedGames);
    };

    const deleteGame = async (platform: string, appid: number | string) => {
        const updatedGames = { ...games };
        if (updatedGames[platform]) {
            updatedGames[platform] = updatedGames[platform].filter(game => game.appid !== appid);
            if (updatedGames[platform].length === 0) {
                delete updatedGames[platform];
            }
        }
        saveGames(updatedGames);
    }

    const clearGames = async () => {
        //include removing saved accounts as well
        await removeAllGames();
        setGames({});
    };

    return { games, error, addGame, deleteGame, clearGames };
}
