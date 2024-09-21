import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import baseUrl from '@/constants/baseUrl';

const imageMap = {
  'r1.jpeg': require('@/assets/data/r1.jpeg'),
  'r2.jpeg': require('@/assets/data/r2.jpeg'),
  'r3.jpeg': require('@/assets/data/r3.jpeg'),
};

const Restaurants = () => {
  const [bundles, setBundles] = useState([]);

  const fetchBundles = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/data/farmers`); // Replace with your server URL
      const data = await response.json();
      setBundles(data);
    } catch (error) {
      console.error('Error fetching bundles:', error);
    }
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}>
      {bundles.map((bundle, index) => (
        <Link href={'/details'} key={index} asChild>
          <TouchableOpacity>
            <View style={styles.categoryCard}>
              <Image source={imageMap[bundle.img]} style={styles.image} />
              <View style={styles.categoryBox}>
                <Text style={styles.categoryText}>{bundle.name}</Text>
                <Text style={{ color: Colors.green }}>
                  {bundle.rating} {bundle.ratings}
                </Text>
                <Text style={{ color: Colors.medium }}>{bundle.distance}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    width: 300,
    height: 350,
    backgroundColor: '#fff',
    marginEnd: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 4,
  },
  categoryText: {
    paddingVertical: 2,
    fontSize: 14,
    fontWeight: 'bold',
  },
  image: {
    flex: 8,
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  categoryBox: {
    flex: 2,
    padding: 10,
  },
});

export default Restaurants;
