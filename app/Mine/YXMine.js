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
  SectionList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Linking,
} from 'react-native';

import YXUserCenter from './YXUserCenter'
import { topCell, normalSectionCell } from '../Component/CellStyle'

import YXWebView from '../Component/YXWebView'


const {width,height} = Dimensions.get('window');

class YXMine extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
        title : '我的',
    }
  };
    constructor(props) {
        super(props);

        this.state = {
            isOn: true,
            userInfo:{},
        };
    }
    
    componentDidMount() {
        storage.load({
            key:'userInfo',
            autoSync: false,
        })
            .then((res)=> {
                console.log(res);
                this.setState({'userInfo':res});
            })
            .catch((err)=>console.log(err));
    }

    render() {
       
        let userInfos = this.state.userInfo;
        return (
            <View style={styles.container}>
                <SectionList
                    sections={[
                        {headerTitle: '', data: [
                            {leftName:userInfos.mobile,isShowRightIcon:true,bottomName:userInfos.name,iconName:userInfos.imgUrl}, 
                        ]},
                        {headerTitle: '', data: [
                            {leftName:'公司/组织设备',isShowRightIcon:true}, 
                            {leftName:'手机号',isShowRightIcon:true,rightName:userInfos.mobile}
                        ]},
                        {headerTitle: '', data: [
                            {leftName:'修改密码',isShowRightIcon:true}, 
                            // {leftName:'收货地址管理',isShowRightIcon:true,nextUrl:'https://www.baidu.com'}, 
                            {leftName:'收货地址管理',isShowRightIcon:true,nextUrl:'http://apisandbox.zoomlion.com/e_contract/index.html#/sign-list'}, 
                            // {leftName:'收货地址管理',isShowRightIcon:true,nextUrl:'http://apisandbox.zoomlion.com/app-web/parts/getGoodsAddrList.htm'}, 
                            {leftName:'发票信息管理',isShowRightIcon:true,nextUrl:'http://apisandbox.zoomlion.com/app-web/parts/getNormalInvoiceList.htm'}
                        ]},
                        {headerTitle: '', data: [
                            {leftName:'设置',isShowRightIcon:true}, 
                            {leftName:'建议',isShowRightIcon:true},
                            {leftName:'关于软件',isShowRightIcon:true},
                            {leftName:'联系我们',isShowRightIcon:false,rightName:'4008-000-0157'}
                        ]},
                        {headerTitle: '', data: [
                            {leftName:'退出',isShowRightIcon:false}, 
                        ]},
                    ]}
                    renderItem={({ item, index, section })=>this.renderSectionItem(item, index, section)}
                    renderSectionHeader={()=>(<View style={{height:10}}></View>)}
                    keyExtractor={(item, index)=> item + index}
                />
            </View>
        );
    }

    renderSectionItem(item, index, section) {
        return(
            <TouchableOpacity 
                onPress={()=>{this.itemPush(item,index,section);}}
            >
                {
                    item.iconName ? 
                    topCell(item,index,section) :
                    normalSectionCell(item,index,section)
                }
            </TouchableOpacity>
        )
    }

    itemPush(item,index,section) {
        if (item.leftName === '联系我们') {
            this.callIphone(item.rightName);
            return;
        }
        if (item.leftName === '收货地址管理' ||
            item.leftName === '发票信息管理') {
            this.props.navigation.navigate('WebView',{'title':item.leftName,otherParam:{nextUrl:item.nextUrl}});
            return;
        }
        if (item.iconName) {
            this.props.navigation.navigate('UserCenter',{'title':'个人资料页'});
        }else {
            if (item.isShowRightIcon) {
                this.props.navigation.navigate('UserCenter',{'title':item.leftName});
            }
        }
    }
    //打电话
    callIphone(iphone) {
        Linking.openURL('tel:'+iphone);
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ebebf1'
    },
    flatListStyle: {

    },
    contentContainerStyle: {
        justifyContent:'space-around',
        alignItems:'center',
        fontSize: 50
    },
});

export default YXMine;
