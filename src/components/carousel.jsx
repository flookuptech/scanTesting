/* eslint-disable quotes */
import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Image, Text } from "react-native-animatable";
import Swiper from "react-native-swiper";

import BrandLogo from "../assets/brand-logo/brandLogo.png";
import metrics from "../configs/metrics";

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8;

class SwiperComponent extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper} autoplay index={0}>
        <View style={styles.slide}>
          <Text
            animation={"fadeInUp"}
            delay={100}
            duration={900}
            style={styles.text}
          >
            Message 1
          </Text>
          <Image
            source={BrandLogo}
            style={styles.BrandLogo}
            animation={"bounceIn"}
            duration={1900}
            delay={200}
          />
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Message 2</Text>
          <Image source={BrandLogo} style={styles.BrandLogo} />
        </View>
        <View style={styles.slide}>
          <Text style={styles.text}>Message 3</Text>
          <Image source={BrandLogo} style={styles.BrandLogo} />
        </View>
      </Swiper>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {},
  BrandLogo: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center"
  },
  slide: {
    flex: 1,
    height: 100,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 20,
    fontFamily: "SourceSansPro-Regular",
    textAlign: "center",
    fontWeight: "200"
  }
});

export default SwiperComponent;
