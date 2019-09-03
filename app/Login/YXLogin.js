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
import { 
    StackActions,
    NavigationActions,
 } from 'react-navigation'

class YXLogin extends React.Component {
   static navigationOptions = ({navigation}) => {
      return {
            header:null,
      }
   };
   render() {
      return (
        <View>
            <Text>ashkdlakshdahslkdhklashdklhaslkdhlkasldkhaashkdlakshdahslkdhklashdklhaslkdhlkasldkhaashkdlakshdahslkdhklashdklhaslkdhlkasldkhaashkdlakshdahslkdhklashdklhaslkdhlkasldkhaashkdlakshdahslkdhklashdklhaslkdhlkasldkhaashkdlakshdahslkdhklashdklhaslkdhlkasldkha≈ls</Text>
            <Button
            title='登录'
            onPress={()=>{
                storage.save({
                    key: 'loginStatus',
                    data: 'true'
                });
                this.props.navigation.dispatch(StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName:'Home'})
                    ],
                }));
            }}
            >
            </Button>
        </View>
      );
   }  
}


export default YXLogin;