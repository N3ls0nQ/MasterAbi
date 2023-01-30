import { View, Text, Dimensions, useWindowDimensions } from "react-native";
import React, { useCallback } from "react";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Button,
  Divider,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Slider } from "@miblanchard/react-native-slider";
import CustomBackdrop from "./CustomBackdrop";
import useData from "../../hooks/UserContext";

const AddExamBottomSheet = ({
  bottomSheetModalRef,
  snapPoints,
  examType,
  setExamType,
  OnEditingFinished,
  date,
  onDatePickerChange,
  showDateTimePicker,
  openDateTimePicker,
  localeDate,
  sliderValue,
  setSliderValue,
}) => {
  const theme = useTheme();
  const {getSemesterAverage} = useData();

  return (
    <BottomSheetModal
      backdropComponent={(props) => (<CustomBackdrop animatedIndex={props.animatedIndex}/>)}
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
          Note hinzufügen
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

        <Text style={{ fontFamily: "MontserratRegular" }} className="mb-3">
          Datum
        </Text>
        <View className="flex-row items-center justify-between mb-3">
          <Button mode="text" onPress={openDateTimePicker}>
            Datum auswählen
          </Button>
          <Text
            style={{ fontFamily: "MontserratSemiBold" }}
            className="text-base text-center"
          >
            {localeDate}
          </Text>
        </View>
        {showDateTimePicker && (
          <DateTimePicker
            mode="date"
            maximumDate={new Date()}
            is24Hour
            value={date}
            onChange={(event, selectedData) =>
              onDatePickerChange(event, selectedData)
            }
            display="calendar"
          />
        )}
        <Divider bold className="mb-3" />

        <Text style={{ fontFamily: "MontserratRegular" }} className="mb-3">
          {/* Slider für Punkte */}
          Notenpunkte
        </Text>
        <View className="flex flex-row gap-4 justify-between items-center">
          <View style={{ width: useWindowDimensions().width * 0.75 }}>
            <Slider
              value={sliderValue}
              onValueChange={(value) => setSliderValue(Number(value))}
              animateTransitions
              maximumValue={15}
              minimumValue={0}
              step={0.5}
            />
          </View>
          <Text
            style={{ fontFamily: "MontserratSemiBold" }}
            className="text-base text-center"
          >
            {sliderValue}
          </Text>
        </View>
        <Divider bold className="mb-3" />
        <Button mode="elevated" onPress={OnEditingFinished}>
          Fertig
        </Button>
      </View>
    </BottomSheetModal>
  );
};

export default AddExamBottomSheet;
