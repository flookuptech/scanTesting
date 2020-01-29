/* eslint-disable quotes */
/* eslint-disable react/require-extension */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';

import metrics from '../configs/metrics';
import CustomTextInput from '../components/customTextInput';
import CustomButton from '../components/';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  handleSubmit = event => {
    console.log(
      'Email: ' + this.state.email + '\n' + 'Password: ' + this.state.password,
    );
    event.preventDefault();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <CustomTextInput
            placeholder={'Email'}
            name="email"
            autoCompleteType={'email'}
            onChangeText={email => this.setState({email})}
            value={this.state.email}
            // keyboardType={"email-address"}
          />
          <CustomTextInput
            placeholder={'Password'}
            name={'password'}
            value={this.state.password}
            onChangeText={password => this.setState({password})}
            secureTextEntry
          />
        </View>
        <View style={styles.footer}>
          <CustomButton
            onPress={this.handleSubmit}
            text="Log in"
            buttonColor={styles.loginButton}
            textColor={styles.loginButtonText}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: metrics.DEVICE_WIDTH * 0.1,
  },
  footer: {
    height: 150,
    justifyContent: 'center',
  },
  form: {
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: 'white',
  },
  loginButtonText: {
    color: '#009933',
    fontSize: 18,
    textAlign: 'center',
  },
  signupLink: {
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    padding: 20,
  },
});

export default LoginForm;
