import React from "react";
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from "react-native";
import { Colors } from '@/constants/Colors';

type GamePickerProps = {
    gamePlatform: string;
    onSelect: (platform: string) => void;
}

export default function GamePicker({ gamePlatform, onSelect } : GamePickerProps) {
    return (
        <Picker
            selectedValue={gamePlatform}
            style={ styles.picker }
            onValueChange={(itemValue) => onSelect(itemValue)}
        >
            <Picker.Item label="Select a game" value="" color='white' />
            <Picker.Item label="PlayStation" value="PS" color='white' />
            <Picker.Item label="XBox" value="XBox" color='white' />
            <Picker.Item label="Nintendo" value="Nintendo" color='white' />
            <Picker.Item label="Game 4" value="Game 4" color='white' />
            <Picker.Item label="Game 5" value="Game 5" color='white' />
            <Picker.Item label="Game 6" value="Game 6" color='white' />
        </Picker>
    )
}

const styles = StyleSheet.create({
    picker: {
        height: '30%',
        width: '90%',
        backgroundColor: Colors.light,
        marginTop: 20
    }
})