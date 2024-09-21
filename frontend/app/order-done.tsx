import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "expo-router";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import ConfettiCannon from "react-native-confetti-cannon";
import Colors from "@/constants/Colors";

const OrderDone = () => {
  const navigation = useNavigation();
  const [processed, setProcessed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setProcessed(true), 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {!processed && (
        <SafeAreaView className="bg-[#00CCBB] flex-1 justify-center items-center">
          <Animatable.Image
            source={require("@/assets/images/orderLoading.gif")}
            animation="slideInUp"
            iterationCount={1}
            className="h-96 w-96"
          />
          <Animatable.Text
            animation="slideInUp"
            iterationCount={1}
            className="text-lg my-10 text-white font-bold text-center"
          >
            We are processing your order!
          </Animatable.Text>

          <Progress.Circle size={60} indeterminate={true} color="white" />
        </SafeAreaView>
      )}

      {processed && (
        <View className="flex-1 bg-white">
        <Image source={require("@/assets/images/bg-login.png")} className="h-[420px] w-full object-cover" />
          <ConfettiCannon
            count={200}
            origin={{ x: -10, y: 0 }}
            fallSpeed={2500}
            fadeOut={true}
            autoStart={true}
          />

          <View style={{ padding: 20, alignItems: "center" }} className="mt-10">
            <Text
              style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
            >
              Thank you for your order!
            </Text>
            <Link href={"/home"} asChild>
              <TouchableOpacity
                style={styles.orderBtn}
                onPress={() => setProcessed(false)}
              >
                <Text style={styles.footerText}>New order</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  footerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    width: 250,
    height: 50,
    justifyContent: "center",
    marginTop: 20,
  },
});

export default OrderDone;
