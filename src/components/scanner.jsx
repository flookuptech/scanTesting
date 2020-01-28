import React, {Component, Fragment} from 'react';
import {
  Text,
  StatusBar,
  Linking,
  StyleSheet,
  UIManager
} from 'react-native';
import {View, Image} from 'react-native-animatable';
import metrics from '../configs/metrics.jsx';
import BrandLogo from '../assets/brand-logo/brandLogo.png';
import FlookupGif from '../assets/brand-logo/flookupGif.gif';
import CryptoJS from 'crypto-js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import FormButtons from './formButtons.jsx';
import {Item, Button, Icon, Input} from 'native-base';

const IMAGE_WIDTH = metrics.DEVICE_WIDTH * 0.8;

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class Scanner extends Component {
  state = {
    scan: false,
    ScanResult: false,
    result: null,
    passkey: "",
    passKeyError: ""
  };


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
    const passThisAsKey = this.state.passkey;
    console.log('passkey' + passThisAsKey);
  
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
                duration={100} 
                delay={50}
              />
              <Item rounded style={styles.passKeyInputItem}>
                <Icon name="key" style={styles.passKeyIcon}/>
                <Input placeholder="Please enter the passkey"
                  style={styles.passKeyInput}
                  onChangeText={passkey => this.setState({ passkey })}
                  value={this.state.passkey}
                />
              </Item>
              {!!this.state.passKeyError && (
                      <Text style={styles.passKeyError}>{this.state.passKeyError}</Text>
              )}
              <FormButtons
                text={'Scan'}
                onPress={() => {
                  if (this.state.passkey.trim() === "") {
                    this.setState(() => ({ passKeyError: "PassKey required." }));
                  } else {
                    this.setState(() => ({ passKeyError: null }));
                    this.activeQR();
                  }
                }}
              /> 
            </View>
          )}

          {ScanResult && (
            <Fragment>
              <Text style={styles.textTitle1}>Result!</Text>
              <View style={ScanResult ? styles.scanCardView : styles.cardView}>
                <Text>Type : {result.type}</Text>
                <Text>Result : {this.decrypt(result.data, passThisAsKey)}</Text>
                <FormButtons
                  text={'Click to Scan Again'}
                  onPress={this.scanAgain}
                  />
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
              topContent={
                <View>
                    <Button transparent style={styles.backButton} onPress={() => this.setState({scan: false})}> 
                      <Icon name="arrow-back" style={styles.backIcon}/>
                      <Text style={styles.backText}>Go Back</Text>
                    </Button>                  
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

  passKeyInputItem:{
    marginLeft: 25,
    marginRight: 25,
    marginTop:70
  },

  passKeyIcon:{
    fontSize: 30,
    padding: 5,
    marginLeft:20,
    color: 'green'
  },

  passKeyInput:{
    fontSize: 20
  },

  passKeyError:{
    color: "red", 
    textAlign:'center', 
    marginTop: 5, 
    fontSize: 18
  },

  backButton:{
    marginBottom: 400, 
    marginRight: 290
  },
  
  backIcon:{
    fontSize: 35, 
    color: 'green'
  },

  backText:{
    fontSize: 20
  },

  scrollViewStyle: {
    flex: 1,
    justifyContent: 'center'
  },

  textTitle1: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    padding: 16,
    color: '#009933',
  },

  cardView: {
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

});

export default Scanner;