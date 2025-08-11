import { useEffect, useState } from "react";

export type SuggestedGame = {
    id: number;
    name: string;
    background_image: string;
};

export default function useGameSuggestions(selectedGame: string) {
    const [suggestions, setSuggestions] = useState<SuggestedGame[]>([]);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (selectedGame.length === 0) {
                setSuggestions([]);
                return;
            }
            if (selectedGame.length > 3) {
                fetch(
                    `https://us-central1-game-app-5aa9a.cloudfunctions.net/fetchSuggestions?query=${encodeURIComponent(
                        selectedGame
                    )}`
                )
                    .then((res) => {
                        if (!res.ok) throw new Error(`HTTP ${res.status}`);
                        return res.json();
                    })
                    .then((data) => setSuggestions(data))
                    .catch(() => setError("Error fetching suggestions."));
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [selectedGame]);

    return { suggestions, setSuggestions, error };
}
