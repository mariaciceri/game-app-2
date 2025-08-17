export type Game = {
    appid: number | string;
    name: string;
    logo: string;
}

export type SteamGamesResponse = {
    games: Game[];
}

export type ConsoleGamesResponse = {
    total: number;
    games: Game[];
}

export type GameRAWGSuggested = {
    id: number;
    name: string;
    background_image: string;
}



