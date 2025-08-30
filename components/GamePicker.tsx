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
            <Picker.Item label="Select a game" value="" color={Colors.dark} />
            <Picker.Item label="PlayStation" value="PS" color={Colors.dark} />
            <Picker.Item label="XBox" value="XBox" color={Colors.dark} />
            <Picker.Item label="Nintendo" value="Nintendo" color={Colors.dark} />
            <Picker.Item label="Game 4" value="Game 4" color={Colors.dark} />
            <Picker.Item label="Game 5" value="Game 5" color={Colors.dark} />
            <Picker.Item label="Game 6" value="Game 6" color={Colors.dark} />
        </Picker>
    )
}

const styles = StyleSheet.create({
    picker: {
        height: '30%',
        width: '90%',
        backgroundColor: "white",
        marginTop: 20
    }
})