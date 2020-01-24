import React, {Component, Fragment} from 'react';
import {View, StyleSheet} from 'react-native';

import Scanner from './src/components/scanner';

class App extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Scanner />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
