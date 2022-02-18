import * as Location from 'expo-location';
import React, { useEffect } from "react";
import {View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";

const { width:SCREEN_WIDTH } = Dimensions.get("window");

console.log(SCREEN_WIDTH);

export default function APP() {
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async () => {
    const await Location.requestPermissionsAsync();
  }; 
  useEffect(() => {
    ask();
  }, []);
  return (
  <View style={styles.container}>
     <View style={styles.city}>
       <Text style={styles.cityName}>Seoul</Text>
     </View>
     <ScrollView 
       pagingEnabled
       horizontal
       showsHorizontalScrollIndicator={false} 
       ContentContainerStyle={styles.weather}>

       <View style={styles.day}>
         <Text style={styles.temp}>27</Text>
         <Text style={styles.description}>Sunny</Text>
       </View>
       <View style={styles.day}>
         <Text style={styles.temp}>27</Text>
         <Text style={styles.description}>Sunny</Text>
       </View>
       <View style={styles.day}>
         <Text style={styles.temp}>27</Text>
         <Text style={styles.description}>Sunny</Text>
       </View>
       <View style={styles.day}>
         <Text style={styles.temp}>27</Text>
         <Text style={styles.description}>Sunny</Text>
       </View>
      </ScrollView>
     </View> 

   );
  }   

const styles =StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor:"yellow",
  },
  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 62,
    fontWeight: "500",
  },
  weather: {}, 
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 168,
  },
  description: {
    marginTop: -30,
    fontSize:60, 
  },
});

