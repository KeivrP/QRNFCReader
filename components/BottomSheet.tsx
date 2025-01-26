import React, {
  useCallback,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import { StyleSheet, Keyboard } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { ScrollView } from "react-native-gesture-handler";

interface BottomModalProps {
  children: React.ReactNode;
  snapPoint?: number;
}

export interface BottomModalRef {
  open: () => void;
  close: () => void;
}

const BottomModal = forwardRef<BottomModalRef, BottomModalProps>(
  ({ children, snapPoint = 600 }, ref) => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const openSheet = useCallback(() => {
      Keyboard.dismiss();
      bottomSheetModalRef.current?.present();
    }, []);

    const closeSheet = useCallback(() => {
      bottomSheetModalRef.current?.dismiss();
    }, []);

    useImperativeHandle(ref, () => ({
      open: openSheet,
      close: closeSheet,
    }));

    return (
      <>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={[1, snapPoint]}
          backdropComponent={BottomSheetBackdrop}
          android_keyboardInputMode="adjustPan"

        >
          <ScrollView>
            <BottomSheetView style={styles.contentContainer}>
              {children}
            </BottomSheetView>
          </ScrollView>
        </BottomSheetModal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

});

export default BottomModal;