import { View, Text } from "react-native";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useIsFirstRender from "../hooks/useIsFirstRender"

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const firstRender = useIsFirstRender();

  const updateUserDataInAsyncStorage = async () => {
    try {
      //Set the new User and save in AsyncStorage
      //setUser(jsonValue != null ? JSON.parse(jsonValue) : {});
      const value = JSON.stringify(user);
      await AsyncStorage.setItem("user_general", value);
    } catch (e) {
      alert(e);
    }
  };

  const updateUserTasksInAsyncStorage = async () => {
    try {
      const value = JSON.stringify(tasks);
      await AsyncStorage.setItem("user_tasks", value);
    } catch (e) {
      alert(e);
    }
  };

  const updateUserSubjectsInAsyncStorage = async () => {
    try {
      const value = JSON.stringify(subjects);
      await AsyncStorage.setItem("user_subjects", value);
    } catch (e) {
      alert(e);
    }
  };

  const memoedValue = useMemo(
    () => ({
      subjects,
      user,
      tasks,
      setUser,
      setSubjects,
      setTasks,
      //updateUser: updateUserDataInAsyncStorage({name: "hallo"}),
    }),
    [subjects, user, tasks]
  );

  useEffect(() => {
    getUserDataFromAsyncStorage();
    console.log("Retreived Data from Async Storage");
  }, []);

  useEffect(() => {
    updateUserDataInAsyncStorage();
    console.log("Updated User Data in Async Storage");
  }, [user]);

  useEffect(() => {
    if(firstRender) return
    updateUserTasksInAsyncStorage();
    console.log("Updated User Tasks in Async Storage");
  }, [tasks]);

  useEffect(() => {
    if(firstRender) return
    updateUserSubjectsInAsyncStorage();
    console.log("Updated User Subjects in Async Storage");
  }, [subjects]);

  const getUserDataFromAsyncStorage = async () => {
    try {
      let jsonValue = await AsyncStorage.getItem("user_general");
      setUser(jsonValue != null ? JSON.parse(jsonValue) : []);
      
      jsonValue = await AsyncStorage.getItem("user_subjects");
      setSubjects(jsonValue != null ? JSON.parse(jsonValue) : []);

      jsonValue = await AsyncStorage.getItem("user_tasks");
      setTasks(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      alert(e);
    }
  };

  return (
    <UserContext.Provider value={memoedValue}>{children}</UserContext.Provider>
  );
};

export default function useData() {
  return useContext(UserContext);
}

// const userSetup = {
//   name: "username",
//   doNotifications: true,
//   showSemester: 1,
//   average1: 12,
//   average2: 14,
//   average3: "-",
//   average4: "-",
//   state: value,
// };
