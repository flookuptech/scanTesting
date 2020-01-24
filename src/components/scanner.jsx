import React, {Component, Fragment} from 'react';
import {
  TouchableOpacity,
  Text,
  StatusBar,
  Linking,
  View,
  StyleSheet,
} from 'react-native';

import CryptoJS from 'crypto-js';
import QRCodeScanner from 'react-native-qrcode-scanner';

class Scanner extends Component {
  state = {
    scan: false,
    ScanResult: false,
    result: null,
  };
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     scan: false,
  //     ScanResult: false,
  //     result: null,
  //   };
  // }

  onSuccess = e => {
    const check = e.data.substring(0, 4);
    console.log('scanned data' + check);
    this.setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      this.setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
    }
  };

  activeQR = () => {
    this.setState({
      scan: true,
    });
  };

  scanAgain = () => {
    this.setState({
      scan: true,
      ScanResult: false,
    });
  };

  decrypt = data => {
    const test = CryptoJS.AES.decrypt(data, 'k');
    var originalText = test.toString(CryptoJS.enc.Utf8);
    // console.log(originalText);
    return originalText;
  };

  render() {
    const {scan, ScanResult, result} = this.state;
    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          <StatusBar barStyle="dark-content" />
          <Text style={styles.textTitle}>Finance Lookup Advisors</Text>
          {!scan && !ScanResult && (
            <TouchableOpacity
              onPress={this.activeQR}
              style={styles.buttonTouchable}>
              <Text style={styles.buttonTextStyle}>Click to Scan!</Text>
            </TouchableOpacity>
          )}

          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Result!</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result.type}</Text>
                <Text>Result : {this.decrypt(result.data)}</Text>
                {/* <Text numberOfLines={1}>RawData: {result.rawData}</Text> */}
                <TouchableOpacity
                  onPress={this.scanAgain}
                  style={styles.buttonTouchable}>
                  <Text style={styles.buttonTextStyle}>
                    Click to Scan again!
                  </Text>
                </TouchableOpacity>
              </View>
            </Fragment>
          )}

          {scan && (
            <QRCodeScanner
              reactivate={true}
              showMarker={true}
              ref={node => {
                this.scanner = node;
              }}
              onRead={this.onSuccess}
              bottomContent={
                <View>
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => this.scanner.reactivate()}>
                    <Text style={styles.buttonTextStyle}>Got it!</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.buttonTouchable}
                    onPress={() => this.setState({scan: false})}>
                    <Text style={styles.buttonTextStyle}>Close Scanner</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          )}
        </Fragment>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: '#99003d',
  },

  textTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: '#009933',
  },
  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: '#009933',
  },
  cardView: {
    //width: deviceWidth - 32,
    //height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  scanCardView: {
    //width: deviceWidth - 32,
    //height: deviceHeight / 2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
  },
  buttonScan: {
    width: 42,
  },
  descText: {
    padding: 16,
    textAlign: 'justify',
    fontSize: 16,
  },

  highlight: {
    fontWeight: '700',
  },

  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonTouchable: {
    fontSize: 21,
    backgroundColor: '#009933',
    marginTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },
  buttonTextStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Scanner;
