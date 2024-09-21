import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { images } from "@/constants";
import baseUrl from "@/constants/baseUrl";
import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const translations = {
  en: {
    switchLanguage: "Switch Language",
    signUp: "Signup",
    name: "Name",
    email: "Email",
    password: "Password",
    alreadyHaveAccount: "Already have an account?",
    accountCreatedSuccessfully: "Account created successfully",
    failedToCreateAccount: "Failed to create account",
    unexpectedErrorOccurred: "An unexpected error occurred",
  },
  hn: {
    switchLanguage: "भाषा बदलें",
    signUp: "साइन अप करें",
    name: "नाम",
    email: "ईमेल",
    password: "पासवर्ड",
    alreadyHaveAccount: "क्या आपके पास पहले से एक खाता मौजूद है?",
    accountCreatedSuccessfully: "खाता सफलतापूर्वक बनाया गया",
    failedToCreateAccount: "खाता बनाने में विफल",
    unexpectedErrorOccurred: "एक अनपेक्षित त्रुटि हुई",
  },
  pa: {
    switchLanguage: "ਭਾਸ਼ਾ ਬਦਲੋ",
    signUp: "ਸਾਇਨ ਅਪ ਕਰੋ",
    name: "ਨਾਮ",
    email: "ਈਮੇਲ",
    password: "ਪਾਸਵਰਡ",
    alreadyHaveAccount: "ਕੀ ਤੁਸੀਂ ਪਹਿਲਾਂ ਹੀ ਇੱਕ ਖਾਤਾ ਹੈ?",
    accountCreatedSuccessfully: "ਖਾਤਾ ਸਫਲਤਾਪੂਰਵਕ ਬਣਾਇਆ ਗਿਆ",
    failedToCreateAccount: "ਖਾਤਾ ਬਣਾਉਣ ਵਿੱਚ ਅਸਫਲ",
    unexpectedErrorOccurred: "ਇੱਕ ਅਨਪੇਕਸ਼ਿਤ ਗਲਤੀ ਹੋਈ",
  },
}

// Create a new I18n instance
const i18n = new I18n(translations);

// Set the initial locale
i18n.locale = Localization.getLocales()[0].languageCode ?? 'en';
i18n.enableFallback = true;

const SignUp = () => {
  const [name, setName] = useState('');
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

  const handleSignUp = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'consumer',
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Signup successful
        Alert.alert(i18n.t('accountCreatedSuccessfully'), '');
        router.push('/home');
      } else {
        // Signup failed
        Alert.alert(i18n.t('failedToCreateAccount'), data.message || i18n.t('failedToCreateAccount'));
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
        <Text className="text-2xl font-bold mb-6">{i18n.t('signUp')}</Text>
        <TextInput
          className="h-10 border border-gray-300 mb-3 px-2 rounded-md"
          placeholder={i18n.t('name')}
          keyboardType="name-phone-pad"
          autoCapitalize="none"
          value={name}
          onChangeText={setName}
        />
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
        <Link asChild href="/(consumer)/login">
          <Text className="text-primary text-sm font-bold text-right pb-4">
            {i18n.t('alreadyHaveAccount')}
          </Text>
        </Link>
        <TouchableOpacity
          className="bg-primary p-3 rounded items-center"
          onPress={handleSignUp}
        >
          <Text className="text-white font-semibold text-lg">{i18n.t('signUp')}</Text>
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

export default SignUp;
