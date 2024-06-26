import React from 'react'
import { Text } from 'react-native'
import { View } from 'react-native'

const Title = ({ text, size, color, style }) => {
  return (
    <View style={{ maxWidth: "100%" }}>
      <Text numberOfLines={1} style={[{ fontSize: size, color: color, fontWeight: 'bold' }, style]}>{text}</Text>
    </View>
  )
}

export default Title
