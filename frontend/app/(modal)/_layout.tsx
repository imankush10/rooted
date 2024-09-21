import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack>
      <Stack.Screen name="dish" options={{ headerShown: false }} />
      <Stack.Screen name="search-location" options={{headerTitle:"Search Location"}}/>
    </Stack>
  );
}
