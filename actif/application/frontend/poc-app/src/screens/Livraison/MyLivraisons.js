import React from 'react'
import { StyleSheet,View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { STYLES } from '../../constants/theme'
import { Text } from 'react-native-paper'

const MyLivraisons = () => {
  const navigation = useNavigation()
  return (
      <>
          <View style={[myStyle, STYLES.mainLayout]}>

              <Text>Content</Text>
              <ButtonActif onPress={() => navigation.navigate("main")} />

          </View>

      </>
  )
}

const myStyle = StyleSheet.create({

})

export default MyLivraisons
