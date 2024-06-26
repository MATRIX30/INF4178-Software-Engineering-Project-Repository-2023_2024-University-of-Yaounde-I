import React, {useCallback, useMemo, useRef} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

const BottomSheet = ({
  children,
  bottomSheetModalRef,
  handlePresentModalDismiss,
}) => {
  // variables
  const snapPoints = useMemo(() => ['25%', '40%'], []);

  const handleSheetChanges = useCallback(index => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        // onDismiss={}
        // onDismiss={() => handlePresentModalDismiss()}
        backdropComponent={BottomSheetBackdrop}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          {/* <Text>Awesome 🎉</Text> */}
          {children}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
export default BottomSheet;
