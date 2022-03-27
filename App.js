import React, { Component } from 'react';
import { StyleSheet, View, Text, PermissionsAndroid, Platform } from 'react-native';
import { PERMISSIONS, RESULTS, requestMultiple, checkMultiple } from 'react-native-permissions';
import Example from './Example';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionsGranted: false,
    }

    this.handleCameraPermission();
  };

  handleCameraPermission = async () => {
    if (Platform.OS === 'android') {
      // Calling the permission function
      const result = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]);

      if (result['android.permission.CAMERA'] === 'granted'
        && result['android.permission.RECORD_AUDIO'] === 'granted'
        && result['android.permission.READ_EXTERNAL_STORAGE'] === 'granted'
      ) {
        this.setPermissionsGranted(true);
      } else {
        this.setPermissionsGranted(false);
      }

    } else if (Platform.OS = 'ios') {
      const res = await checkMultiple([
        PERMISSIONS.IOS.CAMERA,
        PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
        PERMISSIONS.IOS.MICROPHONE,
      ]);

      if (res[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED
        && res[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY] === RESULTS.GRANTED
        && res[PERMISSIONS.IOS.MICROPHONE] === RESULTS.GRANTED
      ) {
        this.setPermissionsGranted(true);
      } else {
        const res2 = await requestMultiple([
          PERMISSIONS.IOS.CAMERA,
          PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY,
          PERMISSIONS.IOS.MICROPHONE,
        ]);

        if (res2[PERMISSIONS.IOS.CAMERA] === RESULTS.GRANTED
          && res2[PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY] === RESULTS.GRANTED
          && res2[PERMISSIONS.IOS.MICROPHONE] === RESULTS.GRANTED
        ) {
          this.setPermissionsGranted(true)
        } else {
          this.setPermissionsGranted(false);
        }
      }
    }
  }

  setPermissionsGranted = (value) => {
    console.log("setPermissionsGranted", value);
    this.setState({ permissionsGranted: value })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.permissionsGranted &&
          <Example />
        }
        {!this.state.permissionsGranted &&
          <Text>카메라/갤러리 접근 권한이 없습니다. 권한 허용 후 이용해주세요.</Text>
        }
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  }
});