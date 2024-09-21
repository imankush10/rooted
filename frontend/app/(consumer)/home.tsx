import { Text, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import Categories from "@/components/Categories";
import { SafeAreaView } from "react-native-safe-area-context";
import Restaurants from "@/components/Restaurants";
import Colors from "@/constants/Colors";
import SaleCarousel from "@/components/SaleCaraousel";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  en: {
    header: "Your Local Harvest Heroes",
  },
  hn: {
    header: "आपके स्थानीय फसल वीर",
  },
  pa: {
    header: "ਤੁਹਾਡੇ ਸਥਾਨੀ ਫਸਲ ਵੀਰ",
  },
}

// Create a new I18n instance
const i18n = new I18n(translations);

// Set the initial locale
i18n.locale = Localization.getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

const Page = () => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale.split('-')[0]);

  const toggleLanguage = () => {
    const languages = ['en', 'hn', 'pa'];
    const currentIndex = languages.indexOf(currentLanguage);
    const newIndex = (currentIndex + 1) % languages.length;
    const newLanguage = languages[newIndex];
    i18n.locale = newLanguage;
    setCurrentLanguage(newLanguage);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <SaleCarousel toggleLanguage={toggleLanguage} />
        <Text style={styles.header}>{i18n.t('header')}</Text>
        <Restaurants />
        <Categories />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
  },
});

export default Page;
