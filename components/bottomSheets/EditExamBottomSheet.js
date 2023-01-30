import { View, Text } from 'react-native'
import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Button, Divider, SegmentedButtons } from 'react-native-paper'

const EditExamBottomSheet = ({bottomSheetModalRef, snapPoints, examType, setExamType, OnEditingFinished}) => {
  return (
    <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        keyboardBehavior="fillParent"
        snapPoints={snapPoints}
        style={{
          elevation: 5,
          shadowColor: "black",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <View className="p-4">
          <Text
            className="text-lg mb-3"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Note bearbeiten
          </Text>
          <Divider bold className="mb-3" />
          <Text style={{ fontFamily: "MontserratRegular" }} className="mb-3">
            Notentyp
          </Text>

          <SegmentedButtons
            buttons={[
              {
                label: "Schriftlich",
                value: "schriftlich",
              },
              {
                label: "Mündlich",
                value: "mündlich",
              },
              {
                label: "Praktisch",
                value: "praktisch",
              },
            ]}
            density="regular"
            value={examType}
            onValueChange={setExamType}
            className="mb-3"
          />

          <Divider bold className="mb-3" />
          <Button mode="elevated" onPress={OnEditingFinished}>
            Fertig
          </Button>
        </View>
      </BottomSheetModal>
  )
}

export default EditExamBottomSheet