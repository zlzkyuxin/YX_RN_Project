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
  Image,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import CustomNavigator from '../Utils/CustomNavigator'
import { isIphoneX } from '../Utils/YXUtils'

const {width,height} = Dimensions.get('window');
// const STATUS_HEIGHt = Platform.OS === 'ios' ? (isIphoneX() ? 88 : 64) : StatusBar.currentHeight;
const STATUS_HEIGHt = Platform.OS === 'ios' ? (isIphoneX() ? 88 : 64) : 0;
const TOP_Height = Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0;

class NavigationBar extends React.Component {
    render() {
        
        var isShowBack = this.props.showBack ? this.props.showBack : false;
        var backView = this.props.backView;
        var backTitle= this.props.backTitle;
        var title = this.props.title ? this.props.title : '默认';
        var navigator = this.props.navigator;
        var rightIcon1 = this.props.rightIcon1;
        var rightIcon2 = this.props.rightIcon2;

        return (
            <View style={styles.topViewStyle}>
                <View style={styles.navBarStyle}>
                    {isShowBack ? 
                        <TouchableOpacity 
                            onPress={ ()=> {
                                CustomNavigator.goBack();
                            }}
                        >
                            <Image
                                source={{uri:'back'}}   
                                style={styles.backStyle}
                            />
                        </TouchableOpacity> : 
                        <View style={styles.backStyle}></View>
                    }
                    <Text style={styles.titleStyle}>{title}</Text>
                    <View style={styles.rightViewStyle}>
                       { 
                           rightIcon2 ?
                            <TouchableOpacity 
                                onPress={ ()=>
                                    this.props.right2OnPress()
                                }
                            >
                                <Image 
                                    source={{uri: rightIcon2}}
                                    style={styles.rightImageStyle}
                                />
                            </TouchableOpacity> :
                            <View></View>
                        }
                        {
                            rightIcon1 ? 
                            <TouchableOpacity 
                                onPress={ ()=> {
                                   this.props.right1OnPress();
                                }}
                            >
                                <Image 
                                    source={{uri: rightIcon1}}
                                    style={styles.rightImageStyle}
                            />
                            </TouchableOpacity> : 
                            <View></View>
                        }
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
   //头部自定义导航栏
  topViewStyle: {
    height: STATUS_HEIGHt,
    backgroundColor: '#76cb07',
    textAlign: 'center',
  },
  navBarStyle: {
    marginTop: TOP_Height,
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textStyle: {
    lineHeight:44,
    color: 'white'
  },
  backStyle: {
      marginLeft: 8,
      width: 20,
      height: 20,
  },
  titleStyle: {
    fontSize: 17,
    lineHeight:44,
    color: 'white',
    height: 44,
    position: 'absolute',
    textAlign: 'center',
    width: width-120,
    left: 60,

  },
  rightViewStyle: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightImageStyle: {
    width: 20,
    height: 25,
    marginRight: 12,
  },
})

export default NavigationBar;