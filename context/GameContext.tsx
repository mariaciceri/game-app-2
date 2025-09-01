import React, { createContext, useContext } from "react";
import useGames from "@/hooks/useGames";
import { Game } from '@/types/GameTypes';

type GamesContextType = {
    games: Record<string, Game[]>;
    addedGames: Record<string, Game[]>;
    addGame: (platform: string, game: Game) => void;
    deleteGame: (platform: string, appid: number | string) => Promise<void>;
    saveGames: (updatedGames: Record<string, Game[]>) => Promise<void>;
    saveAccountInfo: (account: string, platform: string) => Promise<void>;
    unlinkAccountInfo: (platform: string) => Promise<void>;
    deletePlatformGames: (platform: string) => Promise<void>;
};

const GameContext = createContext<GamesContextType | undefined >(undefined);

export function GamesProvider({ children }: { children: React.ReactNode }) {
    const gamesState = useGames();
    return (
        <GameContext.Provider value={gamesState}>
            {children}
        </GameContext.Provider>
    );
}

export function useGamesContext() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGamesContext must be used within a GamesProvides");
    }
    return context;
}