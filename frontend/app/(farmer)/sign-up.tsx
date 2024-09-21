import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, ActivityIndicator } from "react-native";
import { Link, useRouter } from "expo-router";
import { images } from "@/constants";
import baseUrl from "@/constants/baseUrl";

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !address) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role: 'farmer',
          name,
          email,
          password,
          farmDetails: address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setAddress('');
        router.push('/home');
      } else {
        Alert.alert('Error', data.error || 'Failed to create account');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <Image
        source={images.onboarding2}
        className="h-[320px] w-full object-cover"
      />
      <View className="p-4">
        <Text className="text-2xl font-bold mb-6">Signup</Text>
        <TextInput
          className="h-10 border border-gray-300 mb-3 px-2 rounded-md"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className="h-10 border border-gray-300 mb-3 px-2 rounded-md"
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TextInput
          className="h-10 border border-gray-300 mb-3 px-2 rounded-md"
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />
        <Link asChild href="/(farmer)/login">
          <Text className="text-primary text-sm font-bold text-right pb-4">
            Already have an account?
          </Text>
        </Link>
        <TouchableOpacity 
          className="bg-primary p-3 rounded items-center"
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">Signup</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignUp;