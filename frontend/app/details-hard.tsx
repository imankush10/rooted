import { View, Text, StyleSheet, Image, TouchableOpacity, SectionList, ListRenderItem, ScrollView } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Colors from '@/constants/Colors';
import { Link, useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import useBasketStore from '@/store/basketStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import baseUrl from '@/constants/baseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Details = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [bundle, setBundle] = useState(null); // State to hold the fetched bundle
  const [products, setProducts] = useState([]);

  const opacity = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scrollRef = useRef<ScrollView>(null);
  const itemsRef = useRef<TouchableOpacity[]>([]);

  const fetchBundle = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/data/bundles`); // Replace with your server URL
      const data = await response.json();
      setBundle(data[0]);
    } catch (error) {
      console.error('Error fetching bundle:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        const response = await fetch(`${baseUrl}/api/data/products`, {
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
  

  useEffect(() => {
    fetchBundle();
    fetchProducts();
  }, []);

  const DATA = products.map((item, index) => ({

    title: item.category,
    data: item.products,
    index,
  }));

  const { items, total } = useBasketStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTransparent: true,
      headerTitle: '',
      headerTintColor: Colors.primary,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.roundButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.bar}>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundButton}>
            <Ionicons name="search-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const selectCategory = (index: number) => {
    const selected = itemsRef.current[index];
    setActiveIndex(index);

    selected.measure((x) => {
      scrollRef.current?.scrollTo({ x: x - 16, y: 0, animated: true });
    });
  };

  const onScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    if (y > 350) {
      opacity.value = withTiming(1);
    } else {
      opacity.value = withTiming(0);
    }
  };

  const renderItem: ListRenderItem<any> = ({ item, index }) => (
    <Link href={{ pathname: '/(modal)/dish', params: { id: item.id } }} asChild>
      <TouchableOpacity style={styles.item}>
        <View style={{ flex: 1 }}>
          <Text style={styles.dish}>{item.name}</Text>
          <Text style={styles.dishText}>{item.info}</Text>
          <Text style={styles.dishText}>Rs {item.price}</Text>
        </View>
        <Image source={{ uri: item.img }} style={styles.dishImage} />
      </TouchableOpacity>
    </Link>
  );

  if (!bundle) {
    return <Text>Loading...</Text>; // Show loading state while fetching
  }

  return (
    <>
      <ParallaxScrollView
        scrollEvent={onScroll}
        backgroundColor={'#fff'}
        style={{ flex: 1 }}
        parallaxHeaderHeight={250}
        stickyHeaderHeight={100}
        renderBackground={() => <Image source={{ uri: bundle.img }} style={{ height: 300, width: '100%' }} />}
        contentBackgroundColor={Colors.lightGrey}
        renderStickyHeader={() => (
          <View key="sticky-header" style={styles.stickySection}>
            <Text style={styles.stickySectionText}>{bundle.name}</Text>
          </View>
        )}>
        <View style={styles.detailsContainer}>
          <Text style={styles.restaurantName}>{bundle.name}</Text>
          <Text style={styles.restaurantDescription}>
            {console.log(bundle.tags)}
          {bundle ? `${bundle.delivery} · ${bundle.tags?.map((tag, index) => `${tag}${index < bundle.tags.length - 1 ? ' · ' : ''}`)}` : ''}
          </Text>
          <Text style={styles.restaurantDescription}>{bundle.about}</Text>
          <SectionList
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => `${item.id + index}`}
            scrollEnabled={false}
            sections={DATA}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={{ marginHorizontal: 16, height: 1, backgroundColor: Colors.grey }} />}
            SectionSeparatorComponent={() => <View style={{ height: 1, backgroundColor: Colors.grey }} />}
            renderSectionHeader={({ section: { title, index } }) => <Text style={styles.sectionHeader}>{title}</Text>}
          />
        </View>
      </ParallaxScrollView>

      {/* Sticky segments */}
      <Animated.View style={[styles.stickySegments, animatedStyles]}>
        <View style={styles.segmentsShadow}>
          <ScrollView ref={scrollRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.segmentScrollview}>
            {bundle.items.map((item, index) => (
              <TouchableOpacity
                ref={(ref) => (itemsRef.current[index] = ref!)}
                key={index}
                style={activeIndex === index ? styles.segmentButtonActive : styles.segmentButton}
                onPress={() => selectCategory(index)}>
                <Text style={activeIndex === index ? styles.segmentTextActive : styles.segmentText}>{item.category}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Animated.View>

      {/* Footer Basket */}
      {items > 0 && (
        <View style={styles.footer}>
          <SafeAreaView edges={['bottom']} style={{ backgroundColor: '#fff' }}>
            <Link href="/basket" asChild>
              <TouchableOpacity style={styles.fullButton}>
                <Text style={styles.basket}>{items}</Text>
                <Text style={styles.footerText}>View Basket</Text>
                <Text style={styles.basketTotal}>Rs {total}</Text>
              </TouchableOpacity>
            </Link>
          </SafeAreaView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    backgroundColor: Colors.lightGrey,
  },
  stickySection: {
    backgroundColor: '#fff',
    marginLeft: 70,
    height: 100,
    justifyContent: 'flex-end',
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  stickySectionText: {
    fontSize: 20,
    margin: 10,
  },
  restaurantName: {
    fontSize: 30,
    margin: 16,
  },
  restaurantDescription: {
    fontSize: 16,
    margin: 16,
    lineHeight: 22,
    color: Colors.medium,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    margin: 16,
  },
  item: {
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row',
  },
  dishImage: {
    height: 80,
    width: 80,
    borderRadius: 4,
  },
  dish: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  dishText: {
    fontSize: 14,
    color: Colors.mediumDark,
    paddingVertical: 4,
  },
  stickySegments: {
    position: 'absolute',
    height: 50,
    left: 0,
    right: 0,
    top: 100,
    backgroundColor: '#fff',
    overflow: 'hidden',
    paddingBottom: 4,
  },
  segmentsShadow: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: '100%',
  },
  segmentButton: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentText: {
    color: Colors.primary,
    fontSize: 16,
  },
  segmentButtonActive: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
  },
  segmentTextActive: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  segmentScrollview: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 20,
    paddingBottom: 4,
  },
  footer: {
    position: 'absolute',
    backgroundColor: '#fff',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    paddingTop: 20,
  },
  fullButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    height: 50,
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  basket: {
    color: '#fff',
    backgroundColor: '#19AA86',
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 2,
  },
  basketTotal: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Details;