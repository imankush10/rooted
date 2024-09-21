import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import baseUrl from "@/constants/baseUrl";
import { useRouter } from "expo-router";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetchUserData();
    fetchOrders();
    fetchFavorites();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const response = await fetch(`${baseUrl}/api/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || "Failed to fetch user data");
        }
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("An error occurred while fetching user data");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const response = await fetch(`${baseUrl}/api/orders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error("Failed to fetch orders");
        }
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchFavorites = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const response = await fetch(`${baseUrl}/api/favorites`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setFavorites(data);
        } else {
          console.error("Failed to fetch favorites");
        }
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      router.replace("/welcome");
    } catch (error) {
      console.error("Error during logout:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderTitle}>Order #{item._id}</Text>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text>Total: ${item.total}</Text>
    </View>
  );

  const renderFavoriteItem = ({ item }) => (
    <View style={styles.favoriteItem}>
      <Text style={styles.favoriteTitle}>{item.product.name}</Text>
      <Text>Price: ${item.product.price}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container} className="mt-32">
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        {error ? (
          <Text style={styles.error}>{error}</Text>
        ) : userData ? (
          <>
            <Text style={styles.info}>Name: {userData.name}</Text>
            <Text style={styles.info}>Email: {userData.email}</Text>
            <Text style={styles.info}>Role: {userData.role}</Text>
          </>
        ) : (
          <Text>Loading user data...</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Orders</Text>
        {orders.length > 0 ? (
          <FlatList
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item._id.toString()}
            scrollEnabled={false}
          />
        ) : (
          <Text>No orders found.</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Favorites</Text>
        {favorites.length > 0 ? (
          <FlatList
            data={favorites}
            renderItem={renderFavoriteItem}
            keyExtractor={(item) => item._id.toString()}
            scrollEnabled={false}
          />
        ) : (
          <Text>No favorites found.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color={Colors.primary} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  error: {
    color: "red",
    fontSize: 18,
  },
  orderItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  favoriteItem: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  favoriteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.lightGrey,
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 10,
  },
});

export default Dashboard;
