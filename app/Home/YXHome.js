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
  svg,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import {Svg,Circle} from 'react-native-svg'
import Swiper from 'react-native-swiper'
import { isIphoneX } from '../Utils/YXUtils'
import CustomNavigator from '../Utils/CustomNavigator'
import NavigationBar from '../Component/NavigationBar'
import YXNetwork from '../Utils/YXNetwork'
import md5 from 'react-native-md5'
import { from } from 'rxjs';

const {width,height} = Dimensions.get('window');
const STATUS_HEIGHt = Platform.OS === 'ios' ? (isIphoneX() ? 88 : 64) : StatusBar.currentHeight;
const TOP_Height = Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0;

class YXHome extends React.Component {
  static navigationOptions = (navigation) => {

    return {
      // title : '',
      gestureEnabled: false,
      tabBarVisible: false,
      // header: ()=>(
      //     <NavigationBar 
      //         title='首页'
      //         // backView='Detail'
      //         // backTitle='xxx'
      //         // rightIcon1='icon_homepage_scan'
      //         // right1Push='Detail'
      //         // right1Title=''
      //         // rightIcon2='icon_homepage_message'
      //         // right2Push='Detail'
      //         // right2Title=''
      //         // showBack={true}
      //     />
      // ),
      header: null,
    };
  };
  render() {
    return (
      <View style={{ flex:1 }}>
        {/* 轮播图 */}
        {this.renderSwper()}
        {/* 设备状态图 */}
        {this.renderDeviceState()}
        <View style={{backgroundColor:'#e7e7e7',width:width,height:10}}></View>
        {}
        
        {/* <TouchableOpacity 
            onPress={ ()=>
              // this.props.navigation.navigate('Detail',{'title':'长沙'})
              this.network()
            }
        >
            <Text style={{backgroundColor:'#f40'}}>长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙长沙</Text>
        </TouchableOpacity> */}
      </View>
    );
  }
  
  //轮播图
  renderSwper() {
    return(
        <View style={{height:TOP_Height+180,backgroundColor:'purple'}}>
          <Swiper
              showsButtons={false}
              removeClippedSubviews={false} //这个很主要啊，解决白屏问题
              autoplay={true}
              horizontal ={true}
              showsPagination={false}
          >
          
              <Image source={{uri:'swper1'}} style={{width:width,height:TOP_Height+180}}/>
              <Image source={{uri:'swper2'}} style={{width:width,height:TOP_Height+180}}/>
              <Image source={{uri:'swper3'}} style={{width:width,height:TOP_Height+180}}/>
              <Image source={{uri:'swper4'}} style={{width:width,height:TOP_Height+180}}/>
          </Swiper>
        </View>
    )
  }

  //设备状态
  renderDeviceState() {
    return(
      <View style={{height:180,marginTop:10}}>
          {/* 设备信息 */}
          <View style={{flexDirection:'row',height:120,justifyContent:'space-between'}}>
                <View style={{width:100,height:100,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#666',marginBottom:10}}>有数据(台)</Text>
                    <Text style={{color:'green',fontSize:20}}>0</Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <View style={{marginBottom:10}}>
                        <Svg
                            height="50"
                            width="100"
                        >
                            <Circle
                                cx="50"   //中心点x
                                cy="50"   //中心点y
                                r="45"    //半径
                                stroke="black"　　//外边框 颜色　　
                                strokeWidth="10"  //外边框 宽度
                                fill="clear"   //填充颜色
                                strokeOpacity="0.8"
                            />
                        </Svg>
                    </View>
                    <Text style={{color:'green',marginBottom:10}}>月开工(台)</Text>
                    <Text style={{color:'green',fontSize:20}}>0</Text>
                </View>
                <View style={{width:100,height:100,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#666',marginBottom:10}}>无数据(台)</Text>
                    <Text style={{color:'green',fontSize:20}}>0</Text>
                </View>
          </View>
        
          {/* 异常信息 */}
          <View style={{flexDirection:'row',height:60}}>
              <View style={{width:width/2,height:60,justifyContent:'center',alignItems:'center'}}>
                  <View style={{height:25,flexDirection:'row'}}>
                      <Image source={{uri:'icon_yichangshebei'}} style={{width:15,height:15}}/>
                      <Text style={{paddingLeft:5,color:'#666'}}>异常设备(台)</Text>
                  </View>
                  <Text style={{color:'#f30',fontSize:17}}>0</Text>
              </View>
              <View style={{width:width/2,height:60,justifyContent:'center',alignItems:'center'}}>
                  <View style={{height:25,flexDirection:'row'}}>
                      <Image source={{uri:'icon_yichang'}} style={{width:15,height:15}}/>
                      <Text style={{paddingLeft:5,color:'#666'}}>月操作异常(台)</Text>
                  </View>
                  <Text style={{color:'#f30',fontSize:17}}>0</Text>
              </View>
          </View>
          
      </View>
    )
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
        window.rentSessionid = resp.rentSessionid;
        window.sessionid = resp.sessionid;
        window.userInfo = resp.userInfo;
        // window.localStorage.setItem('userInfo',resp.userInfo);
        storage.save({
          key:'userInfo',
          data: resp.userInfo,
        });
        // alert(window.userInfo);
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
