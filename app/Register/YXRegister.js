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

class YXRegister extends React.Component {
   static navigationOptions = ({navigation}) => {
      return {
          title: navigation.getParam('title', '注册'),
      }
   };
   render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Text>这是注册页面</Text>
           <Button 
               title="Go to Details"
           />
       </View>
      );
   }  
}

export {YXRegister as default};