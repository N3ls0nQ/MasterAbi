import { View, Text } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Appbar,
  Button,
  Divider,
  SegmentedButtons,
  TextInput,
  Switch,
} from "react-native-paper";
import TaskListItem from "../components/Items/TaskListItem";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import SubjectDropDownMenu from "../components/SubjectDropDownMenu";
import useData from "../hooks/UserContext";
import { FlatList } from "react-native-gesture-handler";
import TaskItem from "../components/Items/TaskItem";
import { useNotifications } from "../hooks/useNotifications";
import DateTimePicker from "@react-native-community/datetimepicker";

const formatDate = (inputDate) => {
  var date = inputDate.getDate();
  var month = inputDate.getMonth() + 1;
  var year = inputDate.getFullYear();

  date = date.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");

  return `${date}.${month}.${year}`;
};

const TasksAndHomeworks = () => {
  const [taskDescription, setTaskDescription] = useState("");
  const [taskSubject, setTaskSubject] = useState({});
  const [date, setDate] = useState(new Date());
  const [reminder, setReminder] = useState(true);
  const [dropdownData, setDropdownData] = useState([]);
  const [taskType, setTaskType] = useState("Hausaufgabe");
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [localeDate, setLocaleDate] = useState(formatDate(new Date()));

  const bottomSheetModalRef = useRef(null);
  const flatListRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "75%"], []);
  const { subjects, tasks, setTasks } = useData();
  const { schedulePushNotificationAsync } = useNotifications();


  const getData = () => {
    let temp = [];
    subjects.forEach((subject) => {
      temp.push({ label: subject.name, value: subject.name });
    });
    temp.push({ label: "Kursunabhängig", value: "Kursunabhängig" });
    setDropdownData(temp);
  };

  const handleAddTask = () => {
    addTask();
    if (reminder) handleNotification();
    bottomSheetModalRef.current.dismiss();
    setTaskDescription("");
    setTaskSubject(null);
    setDate(new Date());
    setReminder(true);
    setTaskType("Hausaufgabe");
  };

  const onDatePickerChange = (event, selectedDate) => {
    setDate(selectedDate);
    setLocaleDate(formatDate(selectedDate))
    setShowDateTimePicker(false);
  }

  console.log(tasks);

  const handleNotification = () => {
    if(!reminder) return;
    let dateToSend;
    let tempDate = date;
    if(date.getDate() === new Date().getDate()){
      dateToSend = date;
    } else {
      dateToSend = new Date(tempDate.setDate(tempDate.getDate() - 1));
    }

    const title =
      taskType === "Hausaufgabe"
        ? `Du musst für ${taskSubject} noch eine Hausaufgabe erledigen!`
        : "Neue Benachrichtigung!";
    const message = `${taskDescription}`;
    const data = {
      taskType,
      taskDescription,
      //dueDate,
      taskSubject,
    };
    schedulePushNotificationAsync(title, message, data, dateToSend);
  };

  const addTask = () => {
    setTasks([
      {
        index: tasks.length - 1,
        taskDescription,
        taskSubject,
        date,
        //dueDate,
        reminder,
        taskType,
      },
      ...tasks,
    ]);
  };

  

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.Content title="Aufgaben" />
        <Appbar.Action icon={"filter"} onPress={() => {}} />
        <Appbar.Action
          icon={"plus"}
          onPress={() => bottomSheetModalRef.current.present()}
        />
      </Appbar.Header>
      {tasks.length === 0 ? (
        <View className="justify-center flex-1 items-center gap-2 m-2">
          <Text
            style={{ fontFamily: "MontserratRegular" }}
            className="text-center text-base"
          >
            Ganz schön leer hier.
          </Text>
          <Text
            style={{ fontFamily: "MontserratRegular" }}
            className="text-center text-sm"
          >
            Drücke auf das + um eine Aufgabe hinzuzufügen
          </Text>
        </View>
      ) : (
        <FlatList
          ref={flatListRef}
          data={tasks}
          renderItem={({ item, index }) => {
            return (
              <TaskItem
                item={item}
                key={index}
                simultaneousHandler={flatListRef}
              />
            );
          }}
        />
      )}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
      >
        <View className="p-4 flex justify-center gap-y-3">
          <Text
            className="text-lg"
            style={{ fontFamily: "MontserratSemiBold" }}
          >
            Aufgabe hinzufügen
          </Text>
          <SegmentedButtons
            buttons={[
              { label: "Hausaufgabe", value: "Hausaufgabe" },
              { label: "Anderes", value: "other" },
            ]}
            onValueChange={setTaskType}
            value={taskType}
          />
          <Divider bold />
          {/* TODO: Feld required machen */}
          <Text style={{ fontFamily: "MontserratRegular" }}>Beschreibung</Text>
          <TextInput
            placeholder="Beschreibung"
            mode="outlined"
            value={taskDescription}
            onChangeText={setTaskDescription}
          />
          <Divider bold />
          {/* TODO: Feld required machen */}
          <Text style={{ fontFamily: "MontserratRegular" }}>Kurs</Text>
          <SubjectDropDownMenu
            value={taskSubject}
            setValue={setTaskSubject}
            data={dropdownData}
          />
          <Divider bold />
          <View className="flex-row items-center justify-between">
            <Button mode="text" onPress={() => setShowDateTimePicker(true)}>
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
              minimumDate={new Date()}
              mode="date"
              is24Hour
              value={date}
              onChange={onDatePickerChange}
              display="calendar"
            />
          )}
          <Divider bold />
          <View className="justify-between flex-row items-center">
            <Text style={{ fontFamily: "MontserratRegular" }}>Errinern</Text>
            <Switch value={reminder} onValueChange={setReminder} />
          </View>
          <Divider bold />
          <Button mode="elevated" onPress={handleAddTask}>
            Fertig
          </Button>
        </View>
      </BottomSheetModal>
    </>
  );
};

export default TasksAndHomeworks;
