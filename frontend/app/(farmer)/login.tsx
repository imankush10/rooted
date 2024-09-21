import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { images } from "@/constants";
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseUrl from "@/constants/baseUrl";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

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
        Alert.alert('Success', 'Logged in successfully');
        router.push('/home');
      } else {
        // Login failed
        Alert.alert('Error', data.message || 'Failed to login');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Image
        source={images.onboarding2}
        className="h-[320px] w-full object-cover"
      />
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">Login</Text>
        <TextInput
          className="h-10 border border-gray-300 mb-3 px-2 rounded-md"
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="h-10 border border-gray-300 mb-3 px-2 rounded-md"
          placeholder="Password"
          secureTextEntry
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <Link asChild href="/(consumer)/sign-up">
          <Text className="text-primary text-sm font-bold text-right pb-4">
            Not registered?
          </Text>
        </Link>
        <TouchableOpacity 
          className="bg-primary p-3 rounded items-center"
          onPress={handleLogin}
        >
          <Text className="text-white font-semibold text-lg">Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;