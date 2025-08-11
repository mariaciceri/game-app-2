import { useEffect, useState } from "react";
import { getGameList, removeAllGames, setGameList } from "@/utils/AsyncStorage";

type Game = {
    appid: string;
    name: string;
    logo: string;
};

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

    const clearGames = async () => {
        await removeAllGames();
        setGames({});
    };

    return { games, error, addGame, clearGames };
}
