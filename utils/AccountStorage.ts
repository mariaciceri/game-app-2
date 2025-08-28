import { getAccountInfo, setAccountInfo } from "./AsyncStorage";

export default function saveAccountInfo(account: string, platform: string) {
    getAccountInfo('accounts')
        .then(currentAccounts => {
            const updatedAccount = { ...(currentAccounts || {}), [platform]: account };
            setAccountInfo('accounts', updatedAccount);
        })
        .catch(err => {
            console.error('Error managing account info:', err);
        });
    }