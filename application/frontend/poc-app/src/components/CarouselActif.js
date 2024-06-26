import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
const CarouselActif = ()=>{
    const width = Dimensions.get('window').width;
    return(
        <View style={{ flex: 1 }}>
      <Text>Carousel</Text>
    </View>
    )
}

export default CarouselActif;