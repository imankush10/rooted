import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import baseUrl from "@/constants/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FarmerHome = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const response = await fetch(`${baseUrl}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error("Failed to fetch products");
        }
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setModalVisible(true);
  };

  const handleUpdateProduct = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const response = await fetch(
          `${baseUrl}/api/products/${editingProduct._id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editingProduct),
          }
        );
        if (response.ok) {
          setModalVisible(false);
          fetchProducts();
        } else {
          console.error("Failed to update product");
        }
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const response = await fetch(`${baseUrl}/api/orders/${orderId}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        });
        if (response.ok) {
          fetchOrders();
        } else {
          console.error("Failed to update order status");
        }
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text>Price: ${item.price}</Text>
      <Text>Description: {item.description}</Text>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => handleEditProduct(item)}
      >
        <Ionicons name="create-outline" size={24} color={Colors.primary} />
      </TouchableOpacity>
    </View>
  );

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderTitle}>Order #{item._id}</Text>
      <Text>Date: {new Date(item.date).toLocaleDateString()}</Text>
      <Text>Total: ${item.total}</Text>
      <Text>Status: {item.status}</Text>
      <View style={styles.statusButtons}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            item.status === "processing" && styles.activeStatusButton,
          ]}
          onPress={() => handleUpdateOrderStatus(item._id, "processing")}
        >
          <Text style={styles.statusButtonText}>Processing</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            item.status === "shipped" && styles.activeStatusButton,
          ]}
          onPress={() => handleUpdateOrderStatus(item._id, "shipped")}
        >
          <Text style={styles.statusButtonText}>Shipped</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            item.status === "delivered" && styles.activeStatusButton,
          ]}
          onPress={() => handleUpdateOrderStatus(item._id, "delivered")}
        >
          <Text style={styles.statusButtonText}>Delivered</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} className="mt-20">
      <ScrollView>
        <Text style={styles.header}>Your Product Listings</Text>
        <FlatList
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item._id.toString()}
          scrollEnabled={false}
        />

      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Product</Text>
            <TextInput
              style={styles.input}
              value={editingProduct?.name}
              onChangeText={(text) =>
                setEditingProduct({ ...editingProduct, name: text })
              }
              placeholder="Product Name"
            />
            <TextInput
              style={styles.input}
              value={editingProduct?.price.toString()}
              onChangeText={(text) =>
                setEditingProduct({
                  ...editingProduct,
                  price: parseFloat(text) || 0,
                })
              }
              placeholder="Price"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={editingProduct?.description}
              onChangeText={(text) =>
                setEditingProduct({ ...editingProduct, description: text })
              }
              placeholder="Description"
              multiline
            />
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleUpdateProduct}
            >
              <Text style={styles.updateButtonText}>Update Product</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 16,
    color: Colors.primary,
  },
  productItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.darkGrey,
  },
  orderItem: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: Colors.darkGrey,
  },
  editButton: {
    position: "absolute",
    top: 8,
    right: 8,
    padding: 8,
  },
  statusButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statusButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: Colors.lightGrey,
  },
  activeStatusButton: {
    backgroundColor: Colors.primary,
  },
  statusButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.darkGrey,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: Colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  updateButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  updateButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: Colors.lightGrey,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: Colors.darkGrey,
    fontWeight: "bold",
  },
});

export default FarmerHome;