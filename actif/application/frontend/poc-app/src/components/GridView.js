import React from 'react'
import { StyleSheet, View} from 'react-native'

const Col = ({ numRows, children }) => {
    return (
        <View style={styles[`${numRows}col`]}>{children}</View>
    )
}

const Row = ({ children, style }) => {
    return (
        <View style={[styles.row, style]}>{children}</View>
    )
}

export { Col, Row }

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    "1cols": {
        flex: 1,
    },
    "2cols": {
        flex: 2,
    },
    "3cols": {
        flex: 3
    }
});
