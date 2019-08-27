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

class YXAdd extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>这是添加页面</Text>
        <Button 
            title="Go to Details"
            />
      </View>
    );
  }  
}

export {YXAdd as default};
// export default YXHome;
