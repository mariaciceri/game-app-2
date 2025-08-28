import { useEffect, useState } from "react";
import { getAccountInfo } from "@/utils/AsyncStorage";

export default function useFetchUserAccount(platform: string) {
    const [connectedUser, setConnectedUser] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchAccountInfo = async () => {
            const accountInfo = await getAccountInfo("accounts");
            setConnectedUser(accountInfo?.[platform] || null);
        };
        fetchAccountInfo();
    }, []);

    return connectedUser;
}