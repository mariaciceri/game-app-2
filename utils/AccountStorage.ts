import { getAccountInfo, setAccountInfo, setGameList } from "./AsyncStorage";

/***
 * Saves the account information for a given platform.
 * @param account The account identifier (e.g., username or ID).
 * @param platform The platform name (e.g., 'Steam', 'PS', 'Xbox
 */
export const saveAccountInfo = (account: string, platform: string) => {
    getAccountInfo('accounts')
        .then(currentAccounts => {
            const updatedAccount = { ...(currentAccounts || {}), [platform]: account };
            setAccountInfo('accounts', updatedAccount);
        })
        .catch(err => {
            console.error('Error managing account info:', err);
        });
    }

/***
 * Unlinks the account information for a given platform.
 * @param platform The platform name (e.g., 'Steam', 'PS', 'Xbox
 */
export const unlinkAccountInfo = (platform: string) => {
    getAccountInfo('accounts')
        .then(currentAccounts => {
            delete currentAccounts?.[platform];
            setAccountInfo('accounts', currentAccounts || {});
        })
}

/***
 * Deletes the games associated with a specific platform.
 * @param platform The platform name (e.g., 'Steam', 'PS', 'Xbox
 */
export const deletePlatformGames = (platform: string) => {
    getAccountInfo('games')
        .then(currentGames => {
            delete currentGames?.[platform];
            setGameList('games', currentGames || {});
        })
}