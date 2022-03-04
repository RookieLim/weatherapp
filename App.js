import * as Location from 'expo-location';
import React, { useEffect, useState } from "react";
import { View, Text, Dimensions, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const { width:SCREEN_WIDTH } = Dimensions.get("window");

const API_KEY="5045cbb6fdf605aa92353d8714870487";

const icons = {
  Clouds:"cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "Lightning",
};

export default function APP() {
  const [city, setCity]= useState("Loading...");
  const [days,setDays]= useState([]);
  const [ok, setOk] = useState(true);
  const getWeather =async () =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    if(!granted){
      setOk(false);
    }   
    const{coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false}
  );
  setCity(location[0].city); 
  const response= await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`); 
  const json = await response.json();
  setDays(json.daily);  
 };
 useEffect(()=>{
   getWeather();
 },[]);
 return (
  <View style={styles.container}>
     <View style={styles.city}>
       <Text style={styles.cityName}>{city}</Text>
     </View>
     <ScrollView 
       pagingEnabled
       horizontal
       showsHorizontalScrollIndicator={false} 
       ContentContainerStyle={styles.weather}
     >
      {days.length === 0 ? ( 
      <View style={styles.day}>
       <ActivityIndicator 
       color="white" 
       style={{marginTop:10}} 
       size="large"
       /> 
      </View>
      ) : (
        days.map((day,index) => 
        <View key={index} style={styles.day}>
          <View>
          <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
          <Fontisto name={icons[day.weather[0].main]} size={36} color="black" /></View>
          <Text style={styles.description}>{day.weather[0].main}</Text>  
          <Text style={styles.tinyText}>{day.weather[0].description}</Text>
        </View>
        )
      )}  
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
  tinyText: {
    fontSize: 20,
  }
});
 
