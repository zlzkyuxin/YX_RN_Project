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

class YXModifyMobile extends React.Component {
   static navigationOptions = ({navigation}) => {
      return {
          title: navigation.getParam('title', '修改手机号'),
      }
   };
   render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
           <Text>这是修改手机号页面</Text>
           <Button 
               title="Go to Details"
           />
       </View>
      );
   }  
}

export {YXModifyMobile as default};