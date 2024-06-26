import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';

const AboutComponent = ({imageUrl, name, description, poste}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.profile}>
        <Image source={imageUrl} style={styles.image} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.title}>{poste}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default AboutComponent;

const styles = StyleSheet.create({
  profile: {
    width: '45%',
    borderRadius: SIZES.radius,
    paddingVertical: '3%',
    paddingHorizontal: '2%',
    //   backgroundColor: COLORS.primary,
    shadowColor: COLORS.grey,
    elevation: 3,
    // height: 200,
    marginEnd: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: SIZES.font,
    fontWeight: 'bold',
  },
  title: {
    fontSize: SIZES.menuText,
    color: '#666',
  },
  description: {
    fontSize: SIZES.subText,
    color: '#666',
  },
});
