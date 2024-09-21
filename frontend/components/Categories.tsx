import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import React from 'react';
import { categories } from '@/assets/data/home';

const Categories = () => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        padding: 15,
      }}>
      {categories.map((category, index) => (
        <View style={styles.categoryCard} key={index} className='items-center'>
          <Image source={category.img} className='h-20 w-20'/>
          <Text style={styles.categoryText}>{category.text}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  categoryCard: {
    width: 100, 
    backgroundColor: '#fff',
    marginEnd: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.06,
    borderRadius: 10,
  },
  categoryText: {
    padding: 6,
    fontSize: 13,
    textAlign:"center",
    fontWeight: 'bold',
  },
});

export default Categories;
