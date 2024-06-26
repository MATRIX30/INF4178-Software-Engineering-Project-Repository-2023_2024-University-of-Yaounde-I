import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {COLORS, SIZES} from '../../constants/theme';
import ImageViewer from 'react-native-image-zoom-viewer';
import IconActif from '../IconActif';

const ShowStockImage = ({visible, setVisible, images}) => {
  const hideModal = () => {
    setVisible(false);
  };
  return (
    <View style={styles.MainContainer}>
      <Modal visible={visible} transparent={false} onRequestClose={hideModal}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            backgroundColor: COLORS.black,
            paddingEnd: '1%',
            paddingTop: '1%',
          }}>
          <IconActif
            iconColor={COLORS.whiteSmoke}
            name={'close'}
            onPress={hideModal}
            size={30}
          />
        </View>
        <ImageViewer  onCancel={hideModal} imageUrls={images} />
      </Modal>
    </View>
  );
};

export default ShowStockImage;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.black,
  },
});
