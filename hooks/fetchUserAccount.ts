import { useEffect, useState } from "react";
import { getAccountInfo } from "@/utils/AsyncStorage";

export default function useFetchUserAccount(platform: string) {
    const [connectedUser, setConnectedUser] = useState<string | null>(null);
    const [linked, setLinked] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchAccountInfo = async () => {
            const accountInfo = await getAccountInfo("accounts");
            const user = accountInfo?.[platform] || null;
            setConnectedUser(user);
            setLinked(Boolean(user));
        };
        fetchAccountInfo();
    }, [platform]);

    return { connectedUser, setConnectedUser, linked, setLinked };
}