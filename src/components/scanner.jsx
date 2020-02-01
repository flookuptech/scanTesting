import React, {Component, Fragment} from 'react';
import {
  Text,
  StatusBar,
  Linking,
  StyleSheet,
  UIManager,
} from 'react-native';
import {View, Image} from 'react-native-animatable';
import metrics from '../configs/metrics.jsx';
import BrandLogo from '../assets/brand-logo/brandLogo.png';
import FlookupGif from '../assets/brand-logo/flookupGif.gif';
import CryptoJS from 'crypto-js';
import QRCodeScanner from 'react-native-qrcode-scanner';
import FormButtons from './formButtons.jsx';
import {Item, Button, Input, Icon} from 'native-base';
import {Header, Left, Body, Title, Content, Card, CardItem} from 'native-base';


//import Icon from 'react-native-vector-icons/FontAwesome';
// import FontAwesome, { SolidIcons, RegularIcons, BrandIcons } from 'react-native-fontawesome';


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
              <View animation={'zoomIn'} delay={1200} duration={1200}>
                <Item rounded style={styles.passKeyInputItem} >
                  <Icon name="key" style={styles.passKeyIcon}/>
                  <Input placeholder="Please enter the passkey"
                    style={styles.passKeyInput}
                    onChangeText={passkey => this.setState({ passkey })}
                    value={this.state.passkey}
                  />
                </Item>
              </View>
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
              <View style={{flex:1,backgroundColor:'#3q455c',width:"100%"}}>
                <Header style={{backgroundColor: '#009933'}}>
                  <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                      <Title style={styles.resultHeader}>RESULT</Title>
                  </Body>
                </Header>
                <Content padder>
                  <Card style={{marginBottom: 25}}>
                    <CardItem header bordered>
                      <Body style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.cardTitle}>Asset Information</Text>
                      </Body>
                    </CardItem>
                    <CardItem bordered>
                      <Body>
                        <Text style={styles.cardContent}>{this.decrypt(result.data, passThisAsKey)}</Text>
                      </Body>
                    </CardItem>
                    <CardItem footer bordered>
                    </CardItem>
                  </Card>
                  <FormButtons
                    text={'Scan Again'}
                    onPress={this.scanAgain}
                  />
                </Content>
              </View>
          )}

          {scan && (
              <View style={{flex:1,backgroundColor:'#3q455c',width:"100%"}}>
                  <Header style={{backgroundColor: '#009933'}}>
                    <Left>
                      <Button transparent onPress={() => this.setState({scan: false})}>
                        <Icon name='arrow-back' style={styles.headerIcon} />
                      </Button>
                    </Left>
                    <Body>
                        <Title style={styles.headerText}>SCANNER</Title>
                    </Body>
                  </Header>
                  <QRCodeScanner
                  reactivate={true}
                  showMarker={true}
                  ref={node => {
                    this.scanner = node;
                  }}
                  onRead={this.onSuccess}
                  />
              </View>
          )}
        </Fragment>
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
    fontSize: 18,
    //fontFamily: 'ABeeZee-Regular'
  },

  headerText: {
    marginLeft: 35,
    fontFamily: 'SignikaNegative-Regular',
    fontSize: 18,
    fontWeight: 'bold'
  },

  resultHeader: {
    fontFamily: 'SignikaNegative-Regular',
    fontSize: 18,
    fontWeight: 'bold'
  },

  headerIcon: {
    fontSize: 30   
  },

  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SignikaNegative-SemiBold'
  },

  cardContent: {
    fontSize: 15,
    fontFamily: 'NotoSerifSC-Regular'
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