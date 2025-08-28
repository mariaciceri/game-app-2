import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import AllGameList from '@/components/AllGameList';
import useGames from '@/hooks/useGames';
import { Colors } from '@/constants/Colors';


export default function ProfileScreen() {
    const { games } = useGames();
  
    return (
        <SafeAreaView style={ styles.container }>
            <Text style={ styles.title }>
                Browse all games in your collection! If something is missing, add it in the "Add Game" tab.
            </Text>
            <View style={ styles.horizontalRule }></View>
            <AllGameList games={games} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    horizontalRule: {
        borderBottomColor: Colors.dark,
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginVertical: 10,
        width: '95%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 20,
        color: Colors.dark,
        marginVertical: 25,
        paddingHorizontal: 25,
        lineHeight: 25,
        textAlign: 'justify'
    },
});
