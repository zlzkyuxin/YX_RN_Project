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
  Button,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import NavigationBar from '../Component/NavigationBar'
import CustomNavigator from '../Utils/CustomNavigator';
import { topCell,normalCell } from '../Component/CellStyle'

import YXWebView from '../Component/YXWebView'

class YXUserCenter extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', '个人资料页'),
            // gesturesEnabled: false,
            // tabBarVisible: true,
            // header: ()=>(
            //     <NavigationBar 
            //         title={navigation.getParam('title', '个人资料页')}
            //         // backView='Detail'
            //         // backTitle='xxx'
            //         rightIcon1='icon_sy'
            //         right1Push='Home'
            //         right1Title=''
            //         right1OnPress={ ()=> {
            //             CustomNavigator.goBack();
            //             CustomNavigator.navigate('Home')
            //         }}
            //         showBack={true}
            //     />
            // ),
            headerRight: (
                <TouchableOpacity
                    // onPress={()=>this.rightItemClick()}//这样this指向的是navigation内部
                    onPress={()=>navigation.state.params.navigatePress()}
                >
                    <Image
                        source={{uri:'icon_sy'}}
                        style={{width:30,height:30,marginRight:12}}
                    />
                </TouchableOpacity> 
            ),
        }
    }
    render() {
        return (
            <View style={ styles.constainer }>
                <FlatList
                    data={[
                        {key:'1',leftName:'头像',isShowRightIcon:true,},
                        {key:'2',leftName:'姓名',isShowRightIcon:true,rightName:'133333333333'},
                        {key:'3',leftName:'性别',isShowRightIcon:true,rightName:'未知'},
                        {key:'4',leftName:'推荐人',isShowRightIcon:true,rightName:'xxxx'},
                        {key:'5',leftName:'个人身份认证',isShowRightIcon:true,rightName:'已认证'},
                        {key:'6',leftName:'公司身份认证',isShowRightIcon:true,rightName:'未认证'},
                        {key:'7',leftName:'签名管理',isShowRightIcon:true,},
                    ]}
                    renderItem={({ item })=>this.renderItem(item)}
                />
            </View>
        );
    }

    renderItem(item) {
        return (
            <TouchableOpacity 

            >
                {
                    // item.iconName ? 
                    // topCell(item,index,section) :
                    normalCell(item)
                }
            </TouchableOpacity>
        )
    }


    rightItemClick = () => {
        this.props.navigation.goBack();
        this.props.navigation.navigate('Home');
    }

    componentDidMount() {
        this.props.navigation.setParams({navigatePress:this.rightItemClick})
    }
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1, 
        // alignItems: 'center', 
        // justifyContent: 'center',
    },
});

export default YXUserCenter;