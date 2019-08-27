/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {PushNotificationIOS} from 'react-native';
import YXMain from './app/Main/YXMain'
import CustomNavigator from './app/Utils/CustomNavigator'

class App extends React.Component {
  render() {
    return(
        <YXMain
          ref={ navigatorRef => {
            CustomNavigator.setCustomNavigator(navigatorRef);
        }}
    />
    );
  }

   //界面加载完成时 注册监听事件 
   componentDidMount() {
      // Add listener for push notifications
      PushNotificationIOS.addEventListener('notification', this._onNotification);
      // // Add listener for local notifications
      PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
      // Add listener for deviceToken registered
        PushNotificationIOS.addEventListener('register', this._register);
    }

    //界面即将消失时 注销监听事件 
    componentWillUnMount() {
      // Remove listener for notifications
      PushNotificationIOS.removeEventListener('notification', this._onNotification);
      PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
      PushNotificationIOS.removeEventListener('register', this._register);
    }
    //receive remote notification
   _onNotification(notification) {
   
    } 
    //receive local notification
    _onLocalNotification(notification){
          
    }
    //获取device token
    _register(deviceToken) {
        //使用window保存下devicetoken
        alert('触发了register方法');
        window.iOSDeviceToken = deviceToken;
        console.log('deviceToken='+deviceToken);
    }
}


export default App;
