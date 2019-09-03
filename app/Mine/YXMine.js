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
import { topSectionCell, normalSectionCell } from '../Component/CellStyle'

import YXWebView from '../Component/YXWebView'
import Toast from 'react-native-root-toast';


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
                        {key: 0,headerTitle: '', data: [
                            {row: '00',leftName:userInfos.mobile,isShowRightIcon:true,bottomName:userInfos.name,iconName:userInfos.imgUrl}, 
                        ]},
                        {key: 1,headerTitle: '', data: [
                            {row: '10',leftName:'公司/组织设备',isShowRightIcon:true}, 
                            {row: '11',leftName:'手机号',isShowRightIcon:true,rightName:userInfos.mobile}
                        ]},
                        {key: 2,headerTitle: '', data: [
                            {row: '20',leftName:'修改密码',isShowRightIcon:true},  
                            {row: '21',leftName:'收货地址管理',isShowRightIcon:true,nextUrl:'http://apisandbox.zoomlion.com/app-web/parts/getGoodsAddrList.htm'},
                            {row: '22',leftName:'发票信息管理',isShowRightIcon:true,nextUrl:'http://apisandbox.zoomlion.com/app-web/parts/getNormalInvoiceList.htm'}
                        ]},
                        {key: 3,headerTitle: '', data: [
                            {row: '30',leftName:'设置',isShowRightIcon:true}, 
                            {row: '31',leftName:'建议',isShowRightIcon:true},
                            {row: '32',leftName:'关于软件',isShowRightIcon:true},
                            {row: '33',leftName:'联系我们',isShowRightIcon:false,rightName:'4008-000-0157'}
                        ]},
                        {key: 4,headerTitle: '', data: [
                            {row: '40',leftName:'退出',isShowRightIcon:false}, 
                        ]},
                    ]}
                    renderItem={({ item, index, section })=>this.renderSectionItem(item, index, section)}
                    renderSectionHeader={()=>(<View style={{height:10}}></View>)}
                    keyExtractor={(item, index)=> item.row}
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
                    topSectionCell(item,index,section) :
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
        //设置默认登录公司
        if (item.row === '10') {//section=1,row=0
            this.props.navigation.navigate('Company',{'title':'设置默认登录公司'});
            return;
        }
        //修改手机
        if (item.row === '11') {//section=1,row=0
            this.props.navigation.navigate('ModifyMobile',{'title':'修改手机号'});
            return;
        }
        //修改密码
        if (item.row === '20') {//section=1,row=0
            this.props.navigation.navigate('ModifyPassword',{'title':'修改密码'});
            return;
        }
        //设置
        if (item.row === '30') {//section=1,row=0
            this.props.navigation.navigate('Setting',{'title':'设置'});
            return;
        }
        //建议
        if (item.row === '31') {//section=1,row=0
            this.props.navigation.navigate('Suggest',{'title':'建议'});
            return;
        }
        //关于
        if (item.row === '32') {//section=1,row=0
            this.props.navigation.navigate('About',{'title':'关于软件'});
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
