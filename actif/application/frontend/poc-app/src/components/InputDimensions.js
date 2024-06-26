import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Row } from './GridView'
import { TextInput } from 'react-native-paper'
import { COLORS, SIZES } from '../constants/theme'

const InputDimensions = ({ label, dimenssionLabel, value, setValue, style, onchangeText }) => {
    return (
        <Row style={[style, styles.container]}>
            <Text style={styles.text}>{label}</Text>
            <TextInput
                keyboardType={'numeric'}
                style={styles.inputDimension}
                value={value}
                onChangeText={onchangeText}
            />
            <Text style={styles.text}>{dimenssionLabel}</Text>
        </Row>
    )
}

export default InputDimensions

const styles = StyleSheet.create({
    text: {
        color: COLORS.black,
        fontSize: SIZES.body
    },
    container: {
    },
    inputDimension: {
        height: 20,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    }
})
