import React from "react";
import { Picker } from '@react-native-picker/picker';

type GamePickerProps = {
    gamePlatform: string;
    onSelect: (platform: string) => void;
}

export default function GamePicker({ gamePlatform, onSelect } : GamePickerProps) {
    return (
        <Picker
            selectedValue={gamePlatform}
            style={{
                height: '30%',
                width: '80%',
                backgroundColor: 'black',
                marginTop: 20
            }}
            dropdownIconColor="white"
            onValueChange={(itemValue) => onSelect(itemValue)}
        >
            <Picker.Item label="Select a game" value="" color='white' />
            <Picker.Item label="Play Station" value="Play Station" color='white' />
            <Picker.Item label="XBox" value="XBox" color='white' />
            <Picker.Item label="Nintendo" value="Nintendo" color='white' />
            <Picker.Item label="Game 4" value="Game 4" color='white' />
            <Picker.Item label="Game 5" value="Game 5" color='white' />
            <Picker.Item label="Game 6" value="Game 6" color='white' />
        </Picker>
    )
}