import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { Link } from "expo-router";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  en: {
    chooseCategory: "Choose your category",
    farmer: "I'm a Farmer",
    consumer: "I'm a Consumer",
    switchLanguage: "Switch Language",
  },
  hn: {
    chooseCategory: "अपनी श्रेणी चुनें",
    farmer: "मैं एक किसान हूं",
    consumer: "मैं एक ग्राहक हूं",
    switchLanguage: "भाषा बदलें",
  },
  pa: {
    chooseCategory: "ਆਪਣੀ ਸ਼ਿਫ਼ਤ ਚੁਣੋ",
    farmer: "ਮੈਂ ਇੱਕ ਖੇਤੀਮਿਲ ਹਾਂ",
    consumer: "ਮੈਂ ਇੱਕ ਖਰੀਦਦਾਰ ਹਾਂ",
    switchLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ",
  },
}

// Create a new I18n instance
const i18n = new I18n(translations);

// Set the initial locale
i18n.locale = Localization.getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

const Category = () => {
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
    <View className="flex-1 bg-white">
      <Image
        source={require("@/assets/images/bg-login.png")}
        className="h-[420px] w-full object-cover"
      />
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">{i18n.t('chooseCategory')}</Text>
        <Link href="(farmer)/sign-up" asChild>
          <TouchableOpacity className="bg-primary p-3 rounded items-center mb-3">
            <Text className="text-white font-semibold text-lg">{i18n.t('farmer')}</Text>
          </TouchableOpacity>
        </Link>
        <Link href="(consumer)/sign-up" asChild>
          <TouchableOpacity className="bg-primary p-3 rounded items-center">
            <Text className="text-white font-semibold text-lg">{i18n.t('consumer')}</Text>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          onPress={toggleLanguage}
          className="mt-4 bg-blue-500 px-4 py-2 rounded-full self-center"
        >
          <Text className="text-white">{i18n.t('switchLanguage')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Category;
