import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { images } from "@/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "@/constants/baseUrl";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  en: {
    login: "Login",
    email: "Email",
    password: "Password",
    notRegistered: "Not registered?",
    loggedInSuccessfully: "Logged in successfully",
    failedToLogin: "Failed to login",
    unexpectedErrorOccurred: "An unexpected error occurred",
    switchLanguage: "Switch Language",
  },
  hn: {
    login: "लॉग इन करें",
    email: "ईमेल",
    password: "पासवर्ड",
    notRegistered: "पंजीकृत नहीं हैं?",
    loggedInSuccessfully: "सफलतापूर्वक लॉग इन किया गया",
    failedToLogin: "लॉग इन करने में विफल",
    unexpectedErrorOccurred: "एक अनपेक्षित त्रुटि हुई",
    switchLanguage: "भाषा बदलें",
  },
  pa: {
    login: "ਲੌਗਿਨ",
    email: "ਈਮੇਲ",
    password: "ਪਾਸਵਰਡ",
    notRegistered: "ਰਜਿਸਟਰਡ ਨਹੀਂ ਹੋਇਆ?",
    loggedInSuccessfully: "ਸਫਲਤਾਪੂਰਵਕ ਲੌਗਿਨ ਕੀਤਾ ਗਿਆ",
    failedToLogin: "ਲੌਗਿਨ ਕਰਨ ਵਿੱਚ ਅਸਫਲ",
    unexpectedErrorOccurred: "ਇੱਕ ਅਨਪੇਕਸ਼ਿਤ ਗਲਤੀ ਹੋਈ",
    switchLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ",
  },
}

// Create a new I18n instance
const i18n = new I18n(translations);

// Set the initial locale
i18n.locale = Localization.getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.locale.split('-')[0]);

  const toggleLanguage = () => {
    const languages = ['en', 'hn', 'pa'];
    const currentIndex = languages.indexOf(currentLanguage);
    const newIndex = (currentIndex + 1) % languages.length;
    const newLanguage = languages[newIndex];
    i18n.locale = newLanguage;
    setCurrentLanguage(newLanguage);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        // Login successful
        await AsyncStorage.setItem('userToken', data.token);
        Alert.alert(i18n.t('loggedInSuccessfully'), '');
        router.push('/home');
      } else {
        // Login failed
        Alert.alert(i18n.t('failedToLogin'), data.message || i18n.t('failedToLogin'));
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(i18n.t('unexpectedErrorOccurred'), '');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Image
        source={images.onboarding3}
        className="h-[320px] w-full object-cover"
      />
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">{i18n.t('login')}</Text>
        <TextInput
          className="h-10 border border-gray-300 mb-3 px-2 rounded-md"
          placeholder={i18n.t('email')}
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="h-10 border border-gray-300 mb-3 px-2 rounded-md"
          placeholder={i18n.t('password')}
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <Link asChild href="/(consumer)/sign-up">
          <Text className="text-primary text-sm font-bold text-right pb-4">
            {i18n.t('notRegistered')}
          </Text>
        </Link>
        <TouchableOpacity
          className="bg-primary p-3 rounded items-center"
          onPress={handleLogin}
        >
          <Text className="text-white font-semibold text-lg">{i18n.t('login')}</Text>
        </TouchableOpacity>
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

export default Login;
