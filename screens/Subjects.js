import {
  View,
  Text,
  ScrollView,
  FlatList,
  useWindowDimensions,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import {
  Appbar,
  Button,
  Divider,
  HelperText,
  SegmentedButtons,
  Snackbar,
  TextInput,
} from "react-native-paper";
import SubjectListItem from "../components/SubjectListItem";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { NativeViewGestureHandler } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useData from "../hooks/UserContext";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import CustomDialog from "../components/CustomDialog";
import { Slider } from "@miblanchard/react-native-slider";
import AdvancedSlider from "../components/AdvancedSlider";

const Subjects = () => {
  const { user, setUser } = useData();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "90%"], []);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [subjectType, setSubjectType] = useState("Basiskurs");
  const [showInputError, setShowInputError] = useState(false);
  const [semester, setSemester] = useState(user.showSemester);
  const [snackBarVisible, setSnackbarVisible] = useState(false);
  const [_, rerender] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const [writtenSliderValue, setWrittenSliderValue] = useState(50);
  const [oralSliderValue, setOralSliderValue] = useState(50);
  const [practicalSliderValue, setPracticalSliderValue] = useState(0);

  const isFocused = useIsFocused();
  const { subjects, setSubjects} = useData();

  const addSubjectButtonPressed = () => {
    bottomSheetModalRef.current?.present();
  };

  const addSubjectToList = async () => {
    if (newSubjectName === "") {
      setShowInputError(true);
      return;
    }

    const newSubject = {
      name: newSubjectName,
      type: subjectType,
      color: "#f00",
      weighting: {
        written: writtenSliderValue / 100,
        oral: oralSliderValue / 100,
        practical: practicalSliderValue / 100,
      },
      average: "-",
      semesters: [
        {
          id: 1,
          average: "-",
          grades: [],
        },
        {
          id: 2,
          average: "-",
          grades: [],
        },
        {
          id: 3,
          average: "-",
          grades: [],
        },
        {
          id: 4,
          average: "-",
          grades: [],
        },
      ],
    };
    setSubjects([...subjects, newSubject])
    bottomSheetModalRef.current.dismiss();
    setNewSubjectName("");
    setShowInputError(false);
    setSubjectType("Basiskurs");
    setSnackbarVisible(true);
  };

  const handleSemesterChange = async (value) => {
    if (value === user.showSemester) return;
    setSemester(value);
    try {
      setUser({ ...user, showSemester: value });
    } catch (e) {
      alert(e);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    rerender((_) => _ + 1);
    setRefreshing(false);
  };

  useEffect(() => {
    handleRefresh();
  }, [isFocused]);

  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.Content title="Meine Kurse" />
        <Appbar.Action icon={"plus"} onPress={addSubjectButtonPressed} />
      </Appbar.Header>
      <SegmentedButtons
        buttons={[
          {
            label: "1.Halbjahr",
            value: 1,
          },
          {
            label: "2.Halbjahr",
            value: 2,
          },
          {
            label: "3.Halbjahr",
            value: 3,
          },
          {
            label: "4.Halbjahr",
            value: 4,
          },
        ]}
        density="medium"
        value={semester}
        onValueChange={(value) => handleSemesterChange(value)}
        className="p-4 pb-3"
      />
      <Text className="text-center" style={{ fontFamily: "MontserratLight" }}>
        Zum Akualisieren herunterziehen
      </Text>
      <NativeViewGestureHandler disallowInterruption={true}>
        <FlatList
          className="bg-[#f0f0f0]"
          data={subjects}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item, index }) => {
            return (
              <SubjectListItem
                subject={item}
                index={index}
                semester={semester}
                rerender={rerender}
              />
            );
          }}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      </NativeViewGestureHandler>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        keyboardBehavior="fillParent"
        snapPoints={snapPoints}
        onChange={(index) => {
          if (index === 0) {
            setShowInputError(false);
          }
        }}
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
            Kurs hinzufügen
          </Text>
          <TextInput
            placeholder="Name"
            mode="outlined"
            value={newSubjectName}
            onChangeText={setNewSubjectName}
            error={showInputError}
            dense
          />
          <HelperText type="error" padding="normal" visible={showInputError}>
            Bitte gebe den Kursnamen an!
          </HelperText>
          <Divider bold className="mb-3" />
          <Text style={{ fontFamily: "MontserratRegular" }} className="mb-3">
            Kurstyp
          </Text>

          <SegmentedButtons
            buttons={[
              {
                label: "Basiskurs",
                value: "Basiskurs",
              },
              {
                label: "Leistungskurs",
                value: "Leistungskurs",
              },
            ]}
            density="regular"
            value={subjectType}
            onValueChange={setSubjectType}
            className="mb-3"
          />

          <View>
            <Divider bold className="mb-3" />
            <View className="flex-row gap-2 items-center mb-3">
              <Text style={{ fontFamily: "MontserratRegular" }}>
                Gewichtung
              </Text>
              <Text
                style={{ fontFamily: "MontserratRegular" }}
                className="text-xs"
              >{`(schriftlich : mündlich)`}</Text>
            </View>
            <View>
            <View>
                <Text>Schriftlich</Text>
                <AdvancedSlider
                  animateTransitions
                  maxValue={100}
                  minValue={0}
                  setValue={setWrittenSliderValue}
                  value={writtenSliderValue}
                  step={1}
                  suffix="%"
                />
              </View>
              <View>
                <Text>Mündlich</Text>
                <AdvancedSlider
                  animateTransitions
                  maxValue={100}
                  minValue={0}
                  setValue={setOralSliderValue}
                  value={oralSliderValue}
                  step={1}
                  suffix="%"
                />
              </View>
              <View>
                <Text>Praktisch</Text>
                <AdvancedSlider
                  animateTransitions
                  maxValue={100}
                  minValue={0}
                  setValue={setPracticalSliderValue}
                  value={practicalSliderValue}
                  step={1}
                  suffix="%"
                />
              </View>
            </View>
          </View>
          <Divider bold className="mb-3" />
          <Button mode="elevated" onPress={addSubjectToList}>
            Fertig
          </Button>
        </View>
      </BottomSheetModal>

      <Snackbar
        visible={snackBarVisible}
        duration={2000}
        onDismiss={() => setSnackbarVisible(false)}
      >
        Kurs hinzugefügt!
      </Snackbar>
    </>
  );
};

export default Subjects;
