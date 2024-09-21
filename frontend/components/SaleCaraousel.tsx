import { useEffect, useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";

const SaleCarousel = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    require("../assets/images/sale2.png"),
    require("../assets/images/sale3.png"),
    require("../assets/images/sale1.png"),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (activeIndex === images.length - 1) {
        swiperRef.current?.scrollTo(0);
      } else {
        swiperRef.current?.scrollBy(1);
      }
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, [activeIndex]);

  const isLastSlide = activeIndex === images.length - 1;

  return (
    <View style={{ width: "90%", alignSelf: "center", borderRadius: 20 }}>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View
            style={{
              width: 6,
              height: 1,
              marginHorizontal: 1,
              backgroundColor: "gray",
            }}
          />
        }
        activeDot={
          <View
            style={{
              width: 6,
              height: 1,
              marginHorizontal: 1,
              backgroundColor: "blue",
            }}
          />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
        style={{ height: 250 }}
      >
        {images.map((image, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <Image
              className="object-cover"
              source={image}
              style={{
                width: "100%",
                height: "70%",
                resizeMode: "cover",
                borderRadius: 20,
              }} // Use resizeMode: "cover"
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

export default SaleCarousel;
