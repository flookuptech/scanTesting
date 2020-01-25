/* eslint-disable react/require-extension */
/* eslint-disable quotes */
import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import metrics from '../configs/metrics.jsx';
import CustomButton from './customButton.jsx';

class FormButtons extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <View animation={'zoomIn'} delay={1200} duration={1200}>
          <CustomButton
            onPress={this.props.onPress}
            text={this.props.text}
            buttonColor={styles.signInButton}
            textColor={styles.textColor}
            underlayColor={'blue'}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: metrics.DEVICE_WIDTH * 0.1,
    justifyContent: 'center',
  },
  signInButton: {
    backgroundColor: '#009933',
  },
  textColor: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default FormButtons;
