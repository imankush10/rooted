import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { Link, router } from "expo-router";
import BottomSheet from "./BottomSheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import FilterSheet from "./FilterSheet";
import { I18n } from "i18n-js";
import * as Localization from "expo-localization";

const translations = {
  en: {
    deliveryNow: "Delivery · Now",
    searchPlaceholder: "Veggies, Fruits, Grains...",
    switchLanguage: "Switch Language",
  },
  hn: {
    deliveryNow: "डिलीवरी · अब",
    searchPlaceholder: "सब्जी, फल, अनाज...",
    switchLanguage: "भाषा बदलें",
  },
  pa: {
    deliveryNow: "ਡਿਲੀਵਰੀ · ਹੁਣ",
    searchPlaceholder: "ਸਬਜੀ, ਫਲ, ਅਨਾਜ...",
    switchLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ",
  },
};

// Create a new I18n instance
const i18n = new I18n(translations);

// Set the initial locale
i18n.locale = Localization.getLocales()[0].languageCode ?? "en";
i18n.enableFallback = true;

const CustomHeader = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [currentLanguage, setCurrentLanguage] = useState(
    i18n.locale.split("-")[0]
  );

  const toggleLanguage = () => {
    const languages = ["en", "hn", "pa"];
    const currentIndex = languages.indexOf(currentLanguage);
    const newIndex = (currentIndex + 1) % languages.length;
    const newLanguage = languages[newIndex];
    i18n.locale = newLanguage;
    setCurrentLanguage(newLanguage);
  };

  return (
    <SafeAreaView className="flex-1 bg-white px-2">
      <BottomSheet ref={bottomSheetRef} toggleLanguage={toggleLanguage} />
      <View className="h-16 flex-row justify-between items-center bg-white px-2">
        <View className="flex-row gap-3 items-center">
          <TouchableOpacity onPress={() => router.push("/home")}>
            <Image
              source={require("@/assets/images/big-icon.png")}
              className="h-16 w-16"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => bottomSheetRef.current?.present()}>
            <Text className="text-md font-bold text-medium">
              {i18n.t("deliveryNow")}
            </Text>
            <View className="flex-row gap-1 items-center">
              <Text className="font-extrabold text-lg leading-5">
                Chandigarh
              </Text>
              <Ionicons name="chevron-down" size={22} color={Colors.primary} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={toggleLanguage}
            className="mt-4 bg-blue-500 px-4 py-2 rounded-full self-center z-10"
          >
            <Text className="text-white">{i18n.t("switchLanguage")}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className="items-center bg-lightGrey p-2 rounded-full"
          onPress={() => router.push("/(consumer)/dashboard")}
        >
          <Ionicons name="person-outline" color={Colors.primary} size={24} />
        </TouchableOpacity>
      </View>
      <SearchBar toggleLanguage={toggleLanguage} />
    </SafeAreaView>
  );
};

const SearchBar = ({ toggleLanguage }) => {
  const filterSheetRef = useRef<BottomSheetModal>(null);
  return (
    <View className="bg-white h-16 flex-row p-2">
      <FilterSheet ref={filterSheetRef} />
      <Link href="/" asChild>
        <View className="bg-lightGrey px-3 items-center justify-center rounded-l-md">
          <Ionicons name="search" color={Colors.primary} size={22} />
        </View>
      </Link>
      <TextInput
        className="bg-lightGrey px-1 flex-1 font-semibold text-base rounded-r-md text-mediumDark"
        placeholder={i18n.t("searchPlaceholder")}
      />
      <TouchableOpacity
        className="px-3 items-center justify-center"
        onPress={() => filterSheetRef.current?.present()}
      >
        <Ionicons name="options-outline" color={Colors.primary} size={22} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomHeader;
