import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ListRenderItem,
  Button,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FlatList } from "react-native-gesture-handler";
import categories from "@/assets/data/filter.json";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";

export type Ref = BottomSheetModal;

const ItemBox = () => (
  <>
    <View className="gap-3">
      <TouchableOpacity className="flex-row items-center justify-between px-5 py-2 border-b border-grey pl-7">
        <View className="flex-row gap-5 items-center">
          <Ionicons name="swap-vertical" size={24} color={Colors.medium} />
          <View>
            <Text className="text-base font-medium text-mediumDark">Sort</Text>
            <Text className="text-mediumDark">Recommended</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" color={Colors.medium} size={22} />
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center justify-between px-5 py-2 border-b border-grey pl-7">
        <View className="flex-row gap-5 items-center">
          <Ionicons name="ribbon-outline" size={24} color={Colors.medium} />
          <Text className="text-base font-medium text-mediumDark">
            Farmer rating
          </Text>
        </View>
        <Ionicons name="chevron-forward" color={Colors.medium} size={22} />
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center justify-between px-5 py-2 border-b border-grey pl-7">
        <View className="flex-row gap-5 items-center">
          <Ionicons name="sparkles-outline" size={22} color={Colors.medium} />
          <Text className="text-base font-medium text-mediumDark">Offers</Text>
        </View>
        <Ionicons name="chevron-forward" color={Colors.medium} size={24} />
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center justify-between px-5 py-2 border-b border-grey pl-7">
        <View className="flex-row gap-5 items-center">
          <Ionicons name="restaurant-outline" size={24} color={Colors.medium} />
          <Text className="text-base font-medium text-mediumDark">Dietary</Text>
        </View>
        <Ionicons name="chevron-forward" color={Colors.medium} size={22} />
      </TouchableOpacity>
    </View>
    <Text className="text-xl font-extrabold mt-6 mb-4 px-6">Categories</Text>
  </>
);

const FilterSheet = forwardRef<Ref>((props, ref) => {
  const snapPoints = useMemo(() => ["90%"], []);
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
  const { dismiss } = useBottomSheetModal();
  interface Category {
    name: string;
    count: number;
    checked?: boolean;
  }
  const renderItem: ListRenderItem<Category> = ({ item, index }) => (
    <View className="flex-row p-3 ml-3 justify-between h-12">
      <Text className="text-base font-medium flex-1">
        {item.name} ({item.count})
      </Text>
      <BouncyCheckbox
        useBuiltInState={false}
        size={24}
        fillColor={Colors.primary}
        iconStyle={{
          borderColor: Colors.primary,
          borderRadius: 4,
          borderWidth: 2,
        }}
        innerIconStyle={{ borderRadius: 4 }}
        onPress={() => {
          const newItems = [...items];
          newItems[index].checked = !newItems[index].checked;
          setItems(newItems);
        }}
        isChecked={items[index].checked}
      />
    </View>
  );
  const [items, setItems] = useState<Category[]>(categories);
  const width = useSharedValue(0);
  const scale = useSharedValue(0);

  function handleClearAll() {
    const newItems = items.map((item) => {
      item.checked = false;
      return item;
    });
    setItems(newItems);
  }
  useEffect(() => {
    const selectedItems = items.filter((item) => item.checked);
    if (selectedItems.length > 0) {
      width.value = withTiming(180);
      scale.value = withTiming(1);
    } else {
      width.value = withTiming(0);
      scale.value = withTiming(0);
    }
  }, [items]);

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ display: "none" }}
      backgroundStyle={{ backgroundColor: Colors.lightGrey }}
      backdropComponent={renderBackdrop}
    >
      <View className="flex-1 bg-lightGrey">
        <View className="px-4 flex-row">
          <TouchableOpacity onPress={() => dismiss()}>
            <Ionicons name="close" size={28} color={Colors.primary} />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-center w-5/6 ml-2">
            Filter
          </Text>
        </View>

        <FlatList
          data={items}
          renderItem={renderItem}
          ListHeaderComponent={<ItemBox />}
        />
        <View className="bg-slate-200/70 h-[90px]"></View>
        <View className="absolute bottom-0 left-0 right-0 py-4 px-2 bg-white flex-row justify-center items-center gap-2">
          <Animated.View
            style={{
              borderWidth: 2,
              borderRadius: 10,
              borderColor: Colors.primary,
              width: width,
              transform: [{ scale }],
            }}
          >
            <TouchableOpacity
              className=" p-2 items-center h-11"
              onPress={handleClearAll}
            >
              <Text className="text-primary font-semibold text-lg">Clear</Text>
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity
            className=" bg-primary p-2 items-center rounded-lg flex-1 h-12"
            onPress={() => dismiss()}
          >
            <Text className="text-white font-semibold text-lg">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
});

export default FilterSheet;
