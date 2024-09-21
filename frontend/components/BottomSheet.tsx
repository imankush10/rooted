import { View, Text, TouchableOpacity } from "react-native";
import React, { forwardRef, useCallback, useMemo } from "react";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export type Ref = BottomSheetModal;

const BottomSheet = forwardRef<Ref>(({ toggleLanguage }, ref) => {
  const snapPoints = useMemo(() => ["45%"], []);
  const { dismiss } = useBottomSheetModal();

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    []
  );
  return (
    <BottomSheetModal
      backgroundStyle={{ backgroundColor: Colors.lightGrey }}
      handleIndicatorStyle={{ display: "none" }}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View className="flex-1">
        <View className="flex-row justify-center gap-3 mb-6">
          <TouchableOpacity>
            <Text className="bg-primary px-6 py-1 rounded-2xl text-lightGrey font-bold text-center text-[15px]">
              Delivery
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="px-6 py-1 font-bold text-[15px] text-primary">
              Pickup
            </Text>
          </TouchableOpacity>
        </View>
        <View className="gap-3 px-4">
          <View className="gap-2">
            <Text className="text-xl font-extrabold">Your location</Text>
            <Link href="/(modal)/search-location" asChild>
              <TouchableOpacity
                className="flex-row items-center justify-between px-2 py-3 border border-grey bg-white"
                onPress={() => dismiss()}
              >
                <View className="flex-row gap-3 items-center">
                  <Ionicons
                    name="location-outline"
                    size={24}
                    color={Colors.medium}
                  />
                  <Text className="text-lg font-medium text-mediumDark">
                    Chandigarh
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  color={Colors.medium}
                  size={24}
                />
              </TouchableOpacity>
            </Link>
          </View>
          <View className="gap-2">
            <Text className="text-lg font-extrabold">Arrival time</Text>
            <Link href="/" asChild>
              <TouchableOpacity className="flex-row items-center justify-between px-2 py-3 border-grey border bg-white">
                <View className="flex-row gap-3 items-center">
                  <Ionicons
                    name="time-outline"
                    size={24}
                    color={Colors.medium}
                  />
                  <Text className="text-lg font-medium text-mediumDark">
                    Now
                  </Text>
                </View>
                <Ionicons
                  name="chevron-forward"
                  color={Colors.medium}
                  size={24}
                />
              </TouchableOpacity>
            </Link>
          </View>
        </View>

        <TouchableOpacity onPress={toggleLanguage} className="mt-auto mb-6">
          <Text className="bg-primary py-4 rounded-lg mx-4 text-white px-4 font-bold text-base text-center">
            Change Language
          </Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

export default BottomSheet;
