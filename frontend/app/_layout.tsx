import { Stack, useNavigation } from "expo-router";
import CustomHeader from "@/components/CustomHeader";
import {
  BottomSheetModalProvider,
  TouchableOpacity,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { LanguageProvider } from "@/context/LanguageContext";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayoutNav() {
  const navigation = useNavigation();
  return (
    <LanguageProvider>
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="category" options={{ headerShown: false }} />
          <Stack.Screen name="(consumer)" options={{ headerShown: false }} />
          <Stack.Screen name="(farmer)" options={{ headerShown: false }} />
          <Stack.Screen name="order-done" options={{ headerShown: false }} />
          <Stack.Screen
            name="basket"
            options={{
              headerTitle: "Your Basket",
            }}
          />
         
          <Stack.Screen
            name="(modal)"
            options={{
              headerShown:false,
              presentation: "fullScreenModal",
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                  }}
                >
                  <Ionicons
                    name="close-outline"
                    size={28}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
    </LanguageProvider>

  );
}

