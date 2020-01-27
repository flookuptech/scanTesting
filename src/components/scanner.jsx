
 
import React, {Component, Fragment} from 'react';
import {
  TouchableOpacity,
  Text,
  StatusBar,
  Linking,
  View,
  StyleSheet,
  UIManager,
  TextInput
} from 'react-native';
import {Image} from 'react-native-animatable';
import metrics from '../configs/metrics.jsx';
import BrandLogo from '../assets/brand-logo/brandLogo.png';
import FlookupGif from '../assets/brand-logo/flookupGif.gif';
import CryptoJS from 'crypto-js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import FormButtons from './formButtons.jsx';
import { Item, Input, Icon, Container, Header, Content} from 'native-base';



const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class Scanner extends Component {
  state = {
    scan: false,
    ScanResult: false,
    result: null,
    passkey: ""
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
    console.log('on button click' +this.state.passkey);
  };

  scanAgain = () => {
    this.setState({
      scan: true,
      ScanResult: false,
    });
  };

  decrypt = (data, key) => {
    const dataToDecrypt = CryptoJS.AES.decrypt(key, 'ff');
    const decryptedKey = dataToDecrypt.toString(CryptoJS.enc.Utf8);
    console.log('Key: ' + decryptedKey);

    const value = data.split('@')[1];
    const test = CryptoJS.AES.decrypt(value, decryptedKey);
    var originalText = test.toString(CryptoJS.enc.Utf8);
    console.log(originalText);
    return originalText;
  };

  render() {
    const {scan, ScanResult, result} = this.state;
    // console.log('object');
    const passThisAsKey = this.state.passkey;
    console.log('passkey' + passThisAsKey);
    // console.log(
    //   this.decrypt(
    //     'flookup@U2FsdGVkX1+j+y8uMiIqd057MGi29npdVAu7m2xaW8PdryvSY5G+ub7l9WGiT9iPwFW0DnzZHsG4EhlzdK7awArXoLdPPfQWmCGFamsIW7+9EIAvXgzzRFEE8S5QY9AUIkBnh92vSYxmBgn2zs+6zvRpISk9zqJkay1dBo3Gqzpk8pWhnKsf8zxEwMvFpIY9VIyI/mj4QMjYYqF8NBtE2D8N3BQaZ2Y6sgqmxDJVRmw=',
    //     passThisAsKey,
    //   ),
    // );

    return (
      <View style={styles.scrollViewStyle}>
        <Fragment>
          <StatusBar backgroundColor="#009933" barStyle="light-content" />
          {!scan && !ScanResult && (
            <View style={styles.container}>
              <Image
                source={BrandLogo}
                style={styles.brandLogo}
                animation={'bounceIn'}
                duration={1900}
                delay={1200}
              />
              <Image
                source={FlookupGif}
                style={styles.flookupGif}
                animation={'bounceIn'}
                // duration={100}
                delay={50}
              />
              <TextInput
                style={{height: 40}}
                name="passkey"
                placeholder="Type here to translate!"
                onChangeText={(passkey) => this.setState({passkey})}
                value={this.state.passkey}
                required
              />
              <FormButtons
                onPress={this.activeQR}
                //style={styles.buttonTouchable}>
                // <Text style={styles.buttonTextStyle}>Click to Scan!</Text>
                text={'Click to Scan !!'}
              />
              {/* </TouchableOpacity> */}
            </View>
          )}

          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Result!</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result.type}</Text>
                <Text>Result : {this.decrypt(result.data, passThisAsKey)}</Text>
                {/* <Text numberOfLines={1}>RawData: {result.rawData}</Text> */}
                <FormButtons
                  //style={styles.buttonTouchable}>
                  text={'Click to Scan Again !!'}
                  />
                {/* <Text style={styles.buttonTextStyle}>
                  onPress={this.scanAgain}
                    Click to Scan again!
                  </Text>
                </TouchableOpacity> */}
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
                  <FormButtons
                    //style={styles.buttonTouchable}
                    onPress={() => this.scanner.reactivate()}
                    text={'Got it !'}
                    /* <Text style={styles.buttonTextStyle}>Got it!</Text> */
                  />
                  <FormButtons
                    //style={styles.buttonTouchable}
                    onPress={() => this.setState({scan: false})}
                    title={'Close Scanner'}
                  />
                  {/* <Text style={styles.buttonTextStyle}>Close Scanner</Text> */}
                  {/* </TouchableOpacity> */}
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
  container: {
    flex: 1,
    flexDirection: 'column',
    width: metrics.DEVICE_WIDTH,
    height: metrics.DEVICE_HEIGHT,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  brandLogo: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH * 2,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  flookupGif: {
    flex: 1,
    height: null,
    width: IMAGE_WIDTH,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 10,
  },
  bottom: {
    backgroundColor: '#009933',
  },
  viewPager: {
    flex: 1,
  },
});

export default Scanner;