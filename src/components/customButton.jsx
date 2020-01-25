/* eslint-disable react/require-extension */
import React from "react";
import {
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Text
} from "react-native";
import { View } from "react-native-animatable";

const CustomButton = ({
  text,
  buttonColor,
  onPress,
  textColor,
  underlayColor
}) => {
  return (
    <View>
      <TouchableOpacity style={[styles.button, buttonColor]} onPress={onPress}>
        <Text style={textColor}>{text}</Text>
      </TouchableOpacity>
      {/* <TouchableHighlight
        style={[styles.button, buttonColor]}
        onPress={onPress}
        underlayColor={underlayColor}
      >
        <Text style={textColor}>{text}</Text>
      </TouchableHighlight> */}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 52,
    borderWidth: 1,
    borderRadius: 5,
    alignSelf: "stretch",
    justifyContent: "center",
    borderColor: "rgba(0, 0, 0, 0.1)"
  }
  // text: {
  //   textAlign: "center",
  //   color: "white",
  //   fontSize: 50
  // }
});

export default CustomButton;
