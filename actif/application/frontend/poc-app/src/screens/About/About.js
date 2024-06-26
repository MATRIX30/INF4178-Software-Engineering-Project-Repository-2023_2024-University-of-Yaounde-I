import React from 'react';
import {Image, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Text} from 'react-native-paper';
import {COLORS, SIZES} from '../../constants/theme';
import AboutComponent from '../../components/AboutComponent';

const About = () => {
  return (
    <View style={{padding: SIZES.padding}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: '1%',
        }}>
        <AboutComponent
          imageUrl={require('../../../assets/images/furel.jpeg')}
          name={'Furel TEGUIMENE YENDJI'}
          poste={'SCRUM MASTER'}
          description={'Software Engineer, Full Stack Developer'}
        />
      </View>
      <View style={styles.container}>
        <AboutComponent
          imageUrl={require('../../../assets/images/dony.jpeg')}
          name={'Donatien METILI'}
          poste={'SCRUM DEVELOPER'}
          description={
            'Software Engineer and Entrepreneur in many domains and student in computer science'
          }
        />
        <AboutComponent
          imageUrl={require('../../../assets/images/scarlett.png')}
          name={'Manuella KENGNI'}
          poste={'SCRUM DEVELOPER'}
          description={'Software Engineer'}
        />
        <AboutComponent
          imageUrl={require('../../../assets/images/scarlett.png')}
          name={'Aicha LOTSI'}
          poste={'SCRUM DEVELOPER'}
          description={'Software Engineer'}
        />
        <AboutComponent
          imageUrl={require('../../../assets/images/scarlett.png')}
          name={'Bruno NDUWARUGIRA'}
          poste={'SCRUM DEVELOPER'}
          description={'Software Engineer'}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: '1%',
        }}>
            <Text style={{color: '#666', fontStyle: 'italic'}}>Actif Developers Team </Text>
        </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 20,
  },
});
