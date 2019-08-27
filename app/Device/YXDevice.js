/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

class YXDevice extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
        title : '设备',
    }
  };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>这是商城页面</Text>
        <Button 
            title="Go to Details"
            />
      </View>
    );
  }  
}

export {YXDevice as default};
// export default YXHome;
