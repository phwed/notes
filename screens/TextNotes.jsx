import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet} from 'react-native';
import { View, Text } from 'react-native-ui-lib';

const TextNotes = () => {

    const {colors} = useTheme()

    return (
        <View flex center style={{backgroundColor: colors.background}}>
            <Text textColor>
                Text Notes
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default TextNotes;
