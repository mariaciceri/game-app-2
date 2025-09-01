import { useEffect, useState } from "react";
import { getAccountInfo, setAccountInfo, setGameList } from "@/utils/AsyncStorage";
import { Game } from "@/types/GameTypes";

export default function useGames() {
    const [games, setGames] = useState<Record<string, Game[]>>({});
    const [addedGames, setAddedGames] = useState<Record<string, Game[]>>({});
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
            setGames(updatedGames);
            await setGameList("games", updatedGames);
        } catch {
            setError("Error saving games.");
        }
    }

    const addGame = async (platform: string, game: Game) => {
        const allAddedGames = { 
            ...addedGames,
            [platform]: [...(addedGames[platform] || []), game]
        }
        setAddedGames(allAddedGames);

        const updatedGames = {
            ...games,
            [platform]: [...(games[platform] || []), game],
        };
        await saveGames(updatedGames);
    };

    const deleteGame = async (platform: string, appid: number | string) => {
        const updatedGames = { ...games };

        updatedGames[platform] = updatedGames[platform].filter(game => game.appid !== appid);
        if (updatedGames[platform].length === 0) {
            delete updatedGames[platform];
        }
        
        await saveGames(updatedGames);
        const allAddedGames = { ...addedGames };

        allAddedGames[platform] = allAddedGames[platform]?.filter(game => game.appid !== appid) || [];
        if (allAddedGames[platform].length === 0) {
            delete allAddedGames[platform];
        }
        setAddedGames(allAddedGames);
    }

    const saveAccountInfo = async (account: string, platform: string) => {
        try {
            const currentAccounts = await getAccountInfo('accounts');
            const updatedAccount = { ...(currentAccounts || {}), [platform]: account };
            await setAccountInfo('accounts', updatedAccount);
        }
        catch (err) {
            console.error('Error managing account info:', err);
        }
    }

    const unlinkAccountInfo = async (platform: string) => {
        try {
            const currentAccounts = await getAccountInfo('accounts');
            delete currentAccounts?.[platform];
            await setAccountInfo('accounts', currentAccounts || {});
        } catch (err) {
            console.error('Error unlinking account info:', err);
        }
    }

    const deletePlatformGames = async (platform: string) => {
        try {
            const currentGames = await getAccountInfo('games');
            delete currentGames?.[platform];
            await setGameList('games', currentGames || {});
            setGames(currentGames);
            const allAddedGames = { ...addedGames };
            delete allAddedGames[platform];
            setAddedGames(allAddedGames);
        } catch (err) {
            console.error('Error deleting platform games:', err);
        }
    }

    return { games,addedGames, error, addGame, deleteGame, saveGames, saveAccountInfo, unlinkAccountInfo, deletePlatformGames};
}
