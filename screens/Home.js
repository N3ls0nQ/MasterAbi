import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import { Appbar, Button } from "react-native-paper";
import MainChart from "../components/MainChart";
import PointsAverageChart from "../components/PointsAverageChart";
import useData from "../hooks/UserContext";
import  DateTimePicker from "@react-native-community/datetimepicker";
import Abiturschnitt from "../components/Abiturschnitt";

const Home = () => {

  const {user} = useData();

  const [chartData, setChartData] = useState([user.average1, user.average2, user.average3, user.average4])

  return (
    <ScrollView>
      <Appbar.Header mode="small">
        <Appbar.Content title="Home" />
      </Appbar.Header>
      <View className="text-xl m-[15px] mb-0">
        <Text className="text-xl mb-4" style={{fontFamily: "MontserratRegular"}}>{`Hallo, ${user.name}`}</Text>
        <Button mode="contained-tonal" icon={"plus"} labelStyle={{fontSize: 15}} onPress>Neue Note</Button>
      </View>
      <View>
        <Text className="text-xl m-[15px] mb-0" style={{fontFamily: "MontserratSemiBold"}}>
          Punktedurchschnitt
        </Text>
        <PointsAverageChart
          yAxisSuffix={" NP"}
          data={chartData}
          labels={["1. Halbjahr", "2. Halbjahr", "3. Halbjahr", "4. Halbjahr"]}
        />
      </View>
      <View className="m-[15px]">
        <Text className="text-xl mb-0" style={{fontFamily: "MontserratSemiBold"}}>
          Vorraussichtlicher Abischnitt
        </Text>
        <Abiturschnitt/>
      </View>
    </ScrollView>
  );
};

export default Home;
