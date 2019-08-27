/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { isIphoneX } from '../Utils/YXUtils'
import CustomNavigator from '../Utils/CustomNavigator'
import NavigationBar from '../Component/NavigationBar'
import YXNetwork from '../Utils/YXNetwork'
import md5 from 'react-native-md5'

const {width,height} = Dimensions.get('window');
const STATUS_HEIGHt = Platform.OS === 'ios' ? (isIphoneX() ? 88 : 64) : StatusBar.currentHeight;
const TOP_Height = Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0;

class YXHome extends React.Component {
  static navigationOptions = (navigation) => {

    return {
      // title : '',
      gestureEnabled: false,
      tabBarVisible: false,
      header: ()=>(
          <NavigationBar 
              title='首页'
              // backView='Detail'
              // backTitle='xxx'
              // rightIcon1='icon_homepage_scan'
              // right1Push='Detail'
              // right1Title=''
              // rightIcon2='icon_homepage_message'
              // right2Push='Detail'
              // right2Title=''
              // showBack={true}
          />
      ),
    };
  };
  render() {
    return (
      <View style={{ flex: 1}}>
        <TouchableOpacity 
                    onPress={ ()=>
                      // this.props.navigation.navigate('Detail',{'title':'长沙'})
                      this.network()
                    }
                >
                    <Text>长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙</Text>
                </TouchableOpacity>
      </View>
    );
  }
  
  renderHeader(){
    return(
      <View style={styles.topViewStyle}>
            <View style={styles.navBarStyle}>
              <TouchableOpacity 
                  onPress={ ()=>
                      CustomNavigator.navigate('Detail',{'title':'选择地址'})
                  }
              >
                  <Text style={styles.textStyle}>长沙</Text>
              </TouchableOpacity>
              <TextInput 
                placeholder="输入商家、商圈、品类"
                style={styles.topInputStyle}
              />
              <View style={styles.rightViewStyle}>
                  <TouchableOpacity 
                      onPress={ ()=>
                          CustomNavigator.navigate('Detail',{'title':'铃铛'})
                      }
                  >
                      <Image 
                          source={{uri: 'icon_homepage_message'}}
                          style={styles.rightImageStyle}
                      />
                  </TouchableOpacity>
                  <TouchableOpacity 
                      onPress={ ()=>
                          CustomNavigator.navigate('Detail',{'title':'扫一扫'})
                      }
                  >
                      <Image 
                          source={{uri: 'icon_homepage_scan'}}
                          style={styles.rightImageStyle}
                    />
                  </TouchableOpacity>
              </View>
          </View>
      </View>
    );
  }

  componentDidMount() {

    let mis = (md5.hex_md5('123456znj')).toUpperCase();
    console.log('密码为：'+mis);
  }

  network = ()=>{
    let mis = (md5.hex_md5('123456znj')).toUpperCase();
    console.log('密码为：'+mis);
    let url = 'http://apisandbox.zoomlion.com/app-web/Client/comminterface.htm';
    let params = {
      funId: 'userLogin',
      accountName:'15211160825',
      password: mis,
    };
    YXNetwork.postJson(url,params,(resp)=>{
        console.log(resp);
    });
  }
}

const styles = StyleSheet.create({
  
  
  //头部自定义导航栏
  topViewStyle: {
    height: STATUS_HEIGHt,
    backgroundColor: 'orange',
    textAlign: 'center',
  },
  navBarStyle: {
    marginTop: TOP_Height,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textStyle: {
    lineHeight:44,
    color: 'white'
  },
  topInputStyle: {
    width: width * 0.68,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    paddingLeft: 10,
  },
  rightViewStyle: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightImageStyle: {
    width: 18,
    height: 25,
    marginRight: 8,
  },
});

export {YXHome as default};
// export default YXHome;
