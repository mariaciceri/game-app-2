import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AllGameList from '@/components/AllGameList';
import useGames from '@/hooks/useGames';



export default function ProfileScreen() {
    const { games } = useGames();
  
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: "black"}}>
            <Text style={{fontSize: 20, textAlign: 'center', color: "white" }}>
                You can find (almost) all of your games here!
            </Text>
            <AllGameList games={games} />

        </SafeAreaView>
    );
}


