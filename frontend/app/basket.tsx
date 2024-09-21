import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import useBasketStore from "@/store/basketStore";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import SwipeableRow from "@/components/SwipeableRow";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseUrl from "@/constants/baseUrl";
import { router } from "expo-router";
import InstaPayQr from 'react-native-instapay-qr';

const Basket = () => {
  const { products, total, clearCart, reduceProduct } = useBasketStore();
  const [order, setOrder] = useState(false);
  const { navigate } = useNavigation();

  const FEES = {
    service: 11,
    delivery: 21,
  };
  //   try {
  //     const token = await AsyncStorage.getItem("userToken");
  //     if (!token) {
  //       Alert.alert('Error', 'You need to be logged in to place an order.');
  //       return;
  //     }

  //     const orderData = {
  //       items: products.map(item => ({
  //         product: item.id.toString(),  // Ensure it's a string if it's a number
  //         quantity: item.quantity
  //       })),
  //       total: total + FEES.service + FEES.delivery
  //     };

  //     const response = await fetch(`${baseUrl}/api/orders`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify(orderData)
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setOrder(true);
  //       clearCart();
  //       navigate('order-done');
  //     } else {
  //       const errorData = await response.json();
  //       Alert.alert('Error', errorData.error || 'Failed to place order. Please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error placing order:', error);
  //     Alert.alert('Error', 'An error occurred while placing your order. Please try again.');
  //   }
  // };

  return (
    <>
      {!order && (
        <>
          <FlatList
            data={products}
            ListHeaderComponent={<Text style={styles.section}>Items</Text>}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: Colors.grey }} />
            )}
            renderItem={({ item }) => (
              <SwipeableRow onDelete={() => reduceProduct(item)}>
                <View style={styles.row}>
                  <Text style={{ color: Colors.primary, fontSize: 18 }}>
                    {item.quantity}x
                  </Text>
                  <Text style={{ flex: 1, fontSize: 18 }}>{item.name}</Text>
                  <Text style={{ fontSize: 18 }}>
                    Rs {item.price * item.quantity}
                  </Text>
                </View>
              </SwipeableRow>
            )}
            ListFooterComponent={
              <View>
                <View
                  style={{ height: 1, backgroundColor: Colors.grey }}
                ></View>
                <View style={styles.totalRow}>
                  <Text style={styles.total}>Subtotal</Text>
                  <Text style={{ fontSize: 18 }}>Rs {total}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Service fee</Text>
                  <Text style={{ fontSize: 18 }}>Rs {FEES.service}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Delivery fee</Text>
                  <Text style={{ fontSize: 18 }}>Rs {FEES.delivery}</Text>
                </View>

                <View style={styles.totalRow}>
                  <Text style={styles.total}>Order Total</Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Rs {(total + FEES.service + FEES.delivery).toFixed(2)}
                  </Text>
                </View>
              </View>
            }
          />

          <View style={styles.footer}>
            <SafeAreaView
              edges={["bottom"]}
              style={{ backgroundColor: "#fff" }}
            >
              <TouchableOpacity
                style={styles.fullButton}
                onPress={router.push("/order-done")}
              >
                <Text style={styles.footerText}>Order now</Text>
              </TouchableOpacity>
            </SafeAreaView>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    gap: 20,
    alignItems: "center",
  },
  section: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 16,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#fff",
  },
  total: {
    fontSize: 18,
    color: Colors.medium,
  },
  footer: {
    position: "absolute",
    backgroundColor: "#fff",
    bottom: 0,
    left: 0,
    width: "100%",
    padding: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 50,
  },
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

export default Basket;
