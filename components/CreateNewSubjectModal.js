import { View, Text } from 'react-native'
import React, { useMemo, useState } from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Button, SegmentedButtons, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CreateNewSubjectModal = ({ref}) => {

    const snapPoints = useMemo(() => ["25%", "50%"], []);
    const [subjects, setSubjects] = useState([]);
    const [newSubjectName, setNewSubjectName] = useState("");
    const [subjectType, setSubjectType] = useState("basiskurs");

    const addSubjectButtonToList = async () => {
        const newSubject =   {
          name: newSubjectName,
          type: subjectType,
          color: "#f00",
          weighting: "1-1",
          semesters: [
            {
              id: 1,
              average: "-",
              grades: [
              ],
            },
            {
              id: 2,
              average: "-",
              grades: [
              ],
            },
            {
              id: 3,
              average: "-",
              grades: [
              ],
            },
            {
              id: 4,
              average: "-",
              grades: [
              ],
            },
          ],
          average: "-",
        }
        let temp = subjects;
        temp.push(newSubject);
        try {
          const jsonValue = JSON.stringify(temp)
          await AsyncStorage.setItem("user_subjects", jsonValue)
        } catch (e){
          alert(e);
        }
        ref.current.dismiss()
      }

  return (
    <BottomSheetModal
    ref={ref}
    index={1}
    snapPoints={snapPoints}
    style={{elevation: 5, shadowColor: "black", shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.25, shadowRadius: 3.84}}
  >
    <View className="p-4 gap-3">
      <Text className="font-bold text-lg">Kurs hinzufügen</Text>
      <TextInput placeholder="Name" mode="outlined" value={newSubjectName} onChangeText={setNewSubjectName}/>
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
      />
      <Button
        mode="elevated"
        onPress={addSubjectButtonToList}
      >
        Fertig
      </Button>
    </View>
  </BottomSheetModal>
  )
}

export default CreateNewSubjectModal