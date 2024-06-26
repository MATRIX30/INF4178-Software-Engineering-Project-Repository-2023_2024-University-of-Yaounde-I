import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

const BottomModal = ({children, modalVisible, setModalVisible, height, backgroundColor }) => {
  const Contain = () => {
    return <View style={{width: '100%',
    // margin: 20,
    height : height ||  null,
    minHeight: '35%',
    backgroundColor: backgroundColor ||  'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }}>
      {/* <Text style={styles.modalText}>Hello World!</Text>
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.textStyle}>Hide Modal</Text>
      </Pressable> */}
      {children}
    </View>
  }
  return (
    <View style={[]}>
      <Modal

        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
          <View  style={styles.container}>

          <Contain />
          </View>
        {/* {children} */}
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('screen').height,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  // modalView: {
  //   width: '100%',
  //   // margin: 20,
  //   height : height || '',
  //   minHeight: '30%',
  //   backgroundColor: backgroundColor ||  'white',
  //   borderRadius: 20,
  //   padding: 15,
  //   alignItems: 'center',
  //   shadowColor: '#000',
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },

  centeredView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 22,

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default BottomModal;