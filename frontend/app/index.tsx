import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Redirect } from 'expo-router';

const Index = () => {
    return <Redirect href="/welcome" />;
}

export default Index