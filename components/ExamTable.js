import { View, Text, FlatList } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Ionicons } from "@expo/vector-icons";
import ExamListItem from "./ExamListItem";
import useData from "../hooks/UserContext";
import EditExamBottomSheet from "./bottomSheets/EditExamBottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import {
  Button,
  Divider,
  IconButton,
  SegmentedButtons,
  useTheme,
} from "react-native-paper";
import AddExamBottomSheet from "./bottomSheets/AddExamBottomSheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { sub } from "react-native-reanimated";
import dateFormatter from "../helper/dateFormatter";
import { useCalculations } from "../hooks/useCalculations";

const ExamTable = ({ subject, setSnackbarVisible }) => {
  const { subjects, user, setSubjects } = useData();
  const {setSemesterAverage} = useCalculations();
  const [semesterToShow, setSemesterToShow] = useState(user.showSemester - 1);
  const bottomSheetModalRef = useRef(null);
  const bottomSheetNewGradeModalRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const newGradeModalBottomSheetSnapPoints = useMemo(() => ["35%", "70%"], []);
  const [examType, setExamType] = useState("schriftlich");
  const [newGradeExamType, setNewGradeExamType] = useState("schriftlich");
  const [date, setDate] = React.useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  const [localeDate, setLocaleDate] = useState(new Date().toLocaleDateString());
  const [sliderValue, setSliderValue] = useState(0);
  const [subjectIndex, setSubjectIndex] = useState(
    subjects.findIndex((s) => s.name === subject.name)
  );
  const navigation = useNavigation();

  const OnEditingFinished = () => {
    bottomSheetModalRef.current.dismiss();
  };

  const OnAddingFinished = async () => {
    let temp = subjects;
    temp[subjectIndex].semesters[semesterToShow].grades.push({
      type: newGradeExamType,
      value: sliderValue,
      date: localeDate,
      id: temp[subjectIndex].semesters[semesterToShow].grades.length
    });
    //setSubjects(temp);

    //Get Average
    let written = 0;
    let writtenCount = 0;
    let practical = 0;
    let practicalCount = 0;
    let oral = 0;
    let oralCount = 0;
    for (
      let i = 0;
      i < temp[subjectIndex].semesters[semesterToShow].grades.length;
      i++
    ) {
      const grade = temp[subjectIndex].semesters[semesterToShow].grades[i];
      switch (grade.type) {
        case "mündlich":
          oral += grade.value;
          oralCount++;
          break;
        case "schriftlich":
          written += grade.value;
          writtenCount++;
          break;
        case "praktisch":
          practical += grade.value;
          practicalCount++;
          break;
      }
    }

    
    if(writtenCount !== 0){
      written /= writtenCount;
      written *= practicalCount == 0 && oralCount == 0 ? 1 : temp[subjectIndex].weighting.written;
    }
    
    if(practicalCount !== 0){
      practical /= practicalCount;
      practical *= writtenCount == 0 && oralCount == 0 ? 1 : temp[subjectIndex].weighting.practical;
    }
    
    if(oralCount !== 0){
      oral /= oralCount;
      oral *= practicalCount == 0 && writtenCount == 0 ? 1 : temp[subjectIndex].weighting.oral;
    }

    console.log(
      temp[subjectIndex].weighting.written,
      temp[subjectIndex].weighting.practical,
      temp[subjectIndex].weighting.oral
    );
    console.info("WRITTEN:", written, "PRACTICAL:", practical, "ORAL:", oral);
    console.log(
      "WRITTEN_COUNT:",
      writtenCount,
      "PRACTICAL_COUNT:",
      practicalCount,
      "ORAL_COUNT:",
      oralCount
    );

    temp[subjectIndex].semesters[semesterToShow].average = written + practical + oral;

    bottomSheetNewGradeModalRef.current.dismiss();

    try {
      setSemesterAverage(semesterToShow);
      const jsonValue = JSON.stringify(temp);
      await AsyncStorage.setItem("user_subjects", jsonValue);
    } catch (e) {
      alert(e);
    }

    navigation.goBack();
    //setSnackbarVisible();
  };

  const formatDate = (inputDate) => {
    var date = inputDate.getDate();
    var month = inputDate.getMonth() + 1;
    var year = inputDate.getFullYear();

    date = date.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");

    return `${date}.${month}.${year}`;
  };

  const onDatePickerChange = useCallback(
    (event, selectedDate) => {
      setDatePickerOpen(false);
      setDate(selectedDate);

      setLocaleDate(formatDate(selectedDate));
    },
    [datePickerOpen, date]
  );

  const openDateTimePicker = () => {
    setDatePickerOpen(true);
  };

  useEffect(() => {
    setLocaleDate(formatDate(new Date()));
  }, []);

  return (
    <View className="mt-6 flex-1">
      <View className="flex-row justify-between items-center">
        <Text style={{ fontFamily: "MontserratLight" }} className="text-lg">
          Meine Noten
        </Text>
        <View className="flex-row">
          <IconButton icon={"filter"} />
          <IconButton
            icon={"plus"}
            onPress={() => bottomSheetNewGradeModalRef.current.present()}
          />
        </View>
      </View>
      <View className="">
        <FlatList
          keyExtractor={(item, index) => `${item.name}-${index}`}
          // data={subjects[index].semesters[semesterToShow].grades}
          data={subject.semesters[semesterToShow].grades}
          renderItem={(item, index) => {
            return (
              <ExamListItem
                exam={item}
                index={index}
                key={index}
                onPress={() => bottomSheetModalRef.current.present()}
                subjectIndex={subjectIndex}
              />
            );
          }}
        />
      </View>
      <EditExamBottomSheet
        bottomSheetModalRef={bottomSheetModalRef}
        snapPoints={snapPoints}
        examType={examType}
        //oldExamType={subjects[index].semesters[semesterToShow].grades[]}
        setExamType={setExamType}
        OnEditingFinished={OnEditingFinished}
      />
      <AddExamBottomSheet
        snapPoints={newGradeModalBottomSheetSnapPoints}
        bottomSheetModalRef={bottomSheetNewGradeModalRef}
        examType={newGradeExamType}
        setExamType={setNewGradeExamType}
        OnEditingFinished={OnAddingFinished}
        date={date}
        localeDate={localeDate}
        onDatePickerChange={onDatePickerChange}
        showDateTimePicker={datePickerOpen}
        openDateTimePicker={openDateTimePicker}
        sliderValue={sliderValue}
        setSliderValue={setSliderValue}
      />
    </View>
  );
};

export default ExamTable;
