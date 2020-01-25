/* eslint-disable react/require-extension */
/* eslint-disable quotes */
import React, { Component } from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
import { View } from "react-native-animatable";

const IS_ANDROID = Platform.OS === "android";

export default class AuthTextInput extends Component {
  state = {
    isFocused: false
  };

  render() {
    const { isFocused } = this.state;
    const { placeholder, secureTextEntry, ...rest } = this.props;
    const borderColor = isFocused ? "white" : "rgba(255,255,255,0.4)";

    return (
      <View style={styles.container}>
        <View style={[styles.textInputWrapper, { borderColor }]}>
          <TextInput
            autoCapitalize={"none"}
            autoCorrect={false}
            style={[styles.textInput]}
            maxLength={32}
            underlineColorAndroid={"transparent"}
            placeholderTextColor={"rgba(255,255,255,0.4)"}
            selectionColor={"white"}
            onFocus={() => this.setState({ isFocused: true })}
            onBlur={() => this.setState({ isFocused: false })}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            {...rest}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    marginBottom: 10
  },
  textInputWrapper: {
    height: 42,
    marginBottom: 2,
    borderBottomWidth: 1
  },
  textInput: {
    flex: 1,
    color: "white",
    margin: IS_ANDROID ? -1 : 0,
    height: 42,
    padding: 7
  }
});
