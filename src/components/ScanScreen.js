import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Dimensions,
  // Image,
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
// import { Actions } from 'react-native-router-flux';

const { width } = Dimensions.get('window');
const opacity = 'rgba(0, 0, 0, .6)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  layerTop: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 2,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 2,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 1,
    backgroundColor: opacity,
  },
  description: {
    fontSize: width * 0.05,
    marginTop: '5%',
    paddingLeft: '5%',
    textAlign: 'left',
    color: '#fdfdfd',
  },
});

export default class ScanScreen extends Component {
  state = {
    hasCameraPermission: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = (data) => {
    Alert.alert(
      'Scan com sucesso!',
      data.data,
    );
  };

  render() {
    const { hasCameraPermission } = this.state;
    const element = hasCameraPermission === null
      ? <Text>Precisamos que você dê permissão para acessarmos a sua camera</Text>
      : hasCameraPermission === false
        ? <Text>Permissão para acessar a Camera negada</Text>
        : (
          <BarCodeScanner
            onBarCodeRead={this._handleBarCodeRead}
            style={[StyleSheet.absoluteFill, styles.container]}
          >
            <View style={styles.layerTop}>
              <Text style={styles.description}>Scan QR Code</Text>
            </View>
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} />
          </BarCodeScanner>
        );
    return (
      <View style={[StyleSheet.absoluteFill, styles.container]}>
        {element}
      </View>
    );
  }
}
