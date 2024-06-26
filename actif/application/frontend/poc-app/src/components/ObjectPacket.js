import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { COLORS } from '../constants/theme';

const ObjectPacket = ({data, index}) => {
  // console.log("🚀 ~ file: ObjectPacket.js:7 ~ ObjectPacket ~ data:", data)
  return (
    <View
      style={{
      
        flexDirection: 'row',
        justifyContent: 'start',
        alignItems: 'start',
        padding: 3,
        
        
      }}>
      <Text
        style={{
          // flex: 1,
          borderBottomWidth: 1,
          borderRightWidth: 1,
          textAlign: 'left',
          borderColor: COLORS.gray,
        }}>
        {index}
      </Text>
      <Text
        style={{
          // flex: 1,
          borderBottomWidth: 1,
          paddingLeft: 5,
          borderColor: COLORS.gray,
        }}>

        {data?.name}, {data?.weight}kg, {data?.width}*{data?.height}m
      </Text>
    </View>
  );
};

export default ObjectPacket;