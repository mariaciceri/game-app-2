export type Game = {
    appid: number;
    name: string;
    logo: string;
}

export type SteamGamesResponse = {
    games: Game[];
}

export type GameRAWGSuggested = {
    id: number;
    name: string;
    background_image: string;
}



