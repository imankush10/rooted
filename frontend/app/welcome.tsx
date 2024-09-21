import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import CustomButton from "@/components/CustomButton";
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import { onboarding } from "@/constants/index";

const translations = {
  en: {
    skip: "Skip",
    getStarted: "Get Started",
    switchLanguage: "Switch Language",
    description1: "Start your journey with us. Get the freshest produce directly from local farmers.",
    description2: "Experience the joy of receiving farm-fresh goods straight from the source.",
    description3: "Order your essentials, and we'll bring the freshest produce right to you.",
    title1: "Fresh from the farm, just for you!",
    title2: "Farmers' harvest at your doorstep",
    title3: "Your order, our delivery",
  },
  hn: {
    skip: "छोड़ें",
    getStarted: "शुरू करें",
    switchLanguage: "भाषा बदलें",
    description1: "हमारे साथ अपना यात्रा शुरू करें। स्थानीय किसानों से सबसे ताज़ा सामग्री प्राप्त करें।",
    description2: "स्रोत से सीधे फ़ार्म-फ़्रेश सामान प्राप्त करने का आनंद अनुभव करें।",
    description3: "अपने आवश्यकताओं का आदेश दें, और हम ताज़ा सामग्री को आपके पास लाएंगे।",
    title1: "फ़ार्म से फ़ार्म, बस आपके लिए!",
    title2: "किसानों का फ़्रेश आपके दरवाजे पर",
    title3: "आपका आदेश, हमारी डिलीवरी",
  },
  pa: {
    skip: "ਛੱਡੋ",
    getStarted: "ਸ਼ੁਰੂ ਕਰੋ",
    switchLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ",
    description1: "ਸਾਡੇ ਨਾਲ ਆਪਣਾ ਯਾਤਰਾ ਸ਼ੁਰੂ ਕਰੋ। ਸਥਾਨੀਯ ਖੇਤੀਮਿਲਕ ਤੋਂ ਤਾਜਾ ਪ੍ਰੋਡੂਸ ਪ੍ਰਾਪਤ ਕਰੋ।",
    description2: "ਸਰੋਤ ਤੋਂ ਸੀਧੇ ਫਾਰਮ-ਫਰੈਸ਼ ਸਾਮਾਨ ਪ੍ਰਾਪਤ ਕਰਨ ਦਾ ਆਨੰਦ ਅਨੁਭਵ ਕਰੋ।",
    description3: "ਆਪਣੀਆਵਸ਼ਿਆਵਾਂ ਦਾ ਆਰਡਰ ਕਰੋ, ਅਤੇ ਅਸੀਂ ਤਾਜਾ ਪ੍ਰੋਡੂਸ ਤੁਹਾਡੇ ਪਾਸ ਲਾਵਾਂਗੇ।",
    title1: "ਫਾਰਮ ਤੋਂ ਤਾਜਾ, ਸਿਰਫ਼ ਤੁਹਾਡ ਲਈ!",
    title2: "ਖੇਤੀਮਿਲਕਾਂ ਦਾ ਤਾਜਾ ਤੁਹਾਡੇ ਘਰ ਦੀ ਦਰਵਾਜ਼ੇ ਤੇ",
    title3: "ਤੁਹਾਡਾ ਆਰਡਰ, ਸਾਡੀ ਡਿਲੀਵਰੀ",
  },
}


const descc = ['description1', 'description2', 'description3']
const titles = ['title1', 'title2', 'title3'];
// Create a new I18n instance
const i18n = new I18n(translations);

// Set the initial locale
i18n.locale = Localization.getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

const Home = () => {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale.split('-')[0]);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const toggleLanguage = () => {
    const languages = ['en', 'hn', 'pa'];
    const currentIndex = languages.indexOf(currentLanguage);
    const newIndex = (currentIndex + 1) % languages.length;
    const newLanguage = languages[newIndex];
    i18n.locale = newLanguage;
    setCurrentLanguage(newLanguage);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="w-full flex flex-row justify-between items-center p-5">
        <TouchableOpacity
          onPress={toggleLanguage}
          className="bg-blue-500 px-4 py-2 rounded-full"
        >
          <Text className="text-white">{i18n.t('switchLanguage')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.replace("/(consumer)/home");
          }}
        >
          <Text>{i18n.t('skip')}</Text>
        </TouchableOpacity>
      </View>

      <Swiper
        ref={swiperRef}
        loop={false}
        activeDotColor="#000"
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item, index) => (
          <View key={item.id} className="flex-1 items-center justify-center px-8">
            <Image source={item.image} className="w-72 h-72" />
            <Text className="font-bold text-3xl text-center mt-10">
              {i18n.t(titles[index])}
            </Text>
            <Text className="text-center text-gray-600 mt-4">
              {i18n.t(descc[index])}
            </Text>
          </View>
        ))}
      </Swiper>

      <CustomButton
        title={i18n.t('getStarted')}
        onPress={() =>
          isLastSlide
            ? router.replace("/category")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10 mb-5 ml-3"
      />
    </SafeAreaView>
  );
};

export default Home;