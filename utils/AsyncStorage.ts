import AsyncStorage from '@react-native-async-storage/async-storage';

export const setGameList = async(key: string, value: object | any[]) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    }
    catch (error) {
        console.error('Error saving data', error);
    }
}

export const getGameList = async(key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return JSON.parse(value);
        }
        return null;
    }
    catch (error) {
        console.error('Error retrieving data', error);
        return null;
    }
}

export const removeAllGames = async () => {
    try {
        await AsyncStorage.removeItem('games');
    } catch (error) {
        console.error('Error clearing AsyncStorage:', error);
    }
};