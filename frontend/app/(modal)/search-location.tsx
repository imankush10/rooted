import { View, Text } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Colors from "@/constants/Colors";

export default function SearchLocation() {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 29.9139,
    longitude: 76.709,
    latitudeDelta: 3.2,
    longitudeDelta: 3.2,
  });

  return (
    <View className="flex-1">
        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            console.log(data, details);
          }}
          query={{
            key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
            language: "en",
          }}
          styles={{
            container:{
              flex:0
            },
            textInput:{
              backgroundColor:Colors.grey
            }
          }}
        />
      <MapView className="flex-1" region={location} showsUserLocation={true} />
      <View className="absolute bottom-4 left-0 right-0 bg-primary mx-4 rounded-md">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text className="py-4 rounded-lg text-white font-bold text-base text-center">
            Confirm
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
