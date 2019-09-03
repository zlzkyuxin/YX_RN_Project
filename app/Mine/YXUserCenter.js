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
import YXNetwork from '../Utils/YXNetwork'
import Toast from 'react-native-root-toast'

import YXWebView from '../Component/YXWebView'
import { StackActions,NavigationActions } from 'react-navigation';

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

    constructor(props) {
        super(props);
        this.state = {
            userInfo : {},
            personAuth: '未认证',
            personUrl: 'http://apisandbox.zoomlion.com/e_contract/index.html#/auth-send-message?authType=1',
            companyAuth: '未认证',
            companyUrl: 'http://apisandbox.zoomlion.com/e_contract/index.html#/auth-send-message?authType=0',
        }
    }

    render() {
        const sex = this.state.userInfo.gender === 'M' ? '男性' : (this.state.userInfo.gender === 'F' ? '女性' : '未知');
        return (
            <View style={ styles.constainer }>
                <FlatList
                    data={[
                        {key:'1',leftName:'头像',isShowRightIcon:true,iconName:this.state.userInfo.imgUrl},
                        {key:'2',leftName:'姓名',isShowRightIcon:true,rightName:this.state.userInfo.name},
                        {key:'3',leftName:'性别',isShowRightIcon:true,rightName:sex},
                        {key:'4',leftName:'推荐人',isShowRightIcon:true,rightName:this.state.userInfo.recommendcode},
                        {key:'5',leftName:'个人身份认证',isShowRightIcon:true,rightName:this.state.personAuth},
                        {key:'6',leftName:'公司身份认证',isShowRightIcon:true,rightName:this.state.companyAuth},
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
                onPress={()=>{this.itemClick(item)}}
            >
                {
                    item.iconName ? 
                    topCell(item) :
                    normalCell(item)
                }
            </TouchableOpacity>
        )
    }


    rightItemClick = () => {
        // this.props.navigation.goBack();
        //重置当前路由
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({routeName: 'More'}),
            ],
        }));
        //切换到第一个tabbar
        this.props.navigation.navigate('First');
    }

    itemClick(item) {
        Toast.show(JSON.stringify(item),{
            duration: Toast.durations.LONG, // toast显示时长
            position: Toast.positions.CENTER, // toast位置
            shadow: true, // toast是否出现阴影
            animation: true, // toast显示/隐藏的时候是否需要使用动画过渡
            hideOnPress: true, // 是否可以通过点击事件对toast进行隐藏
            delay: 0, // toast显示的延时
            onShow: () => { 
                // toast出现回调（动画开始时）
            },
            onShown: () => {
                // toast出现回调（动画结束时）
            },
            onHide: () => {
                // toast隐藏回调（动画开始时）
            },
            onHidden: () => {
                // toast隐藏回调（动画结束时）
            }
        });
        if (item.key === '5') {//个人认证
            this.props.navigation.navigate('WebView',{'title':'个人认证',otherParam:{nextUrl:this.state.personUrl}});
        }else if (item.key === '6') {//公司认证
            if (this.state.companyUrl.length > 0) {
                this.props.navigation.navigate('WebView',{'title':'公司认证',otherParam:{nextUrl:this.state.companyUrl}});
            }else {
                Toast.show('公司认证正在审核中');
            }
        }else if (item.key === '7') {//签名管理
            this.props.navigation.navigate('WebView',{'title':'签名管理',otherParam:{nextUrl:'http://apisandbox.zoomlion.com/e_contract/index.html#/sign-list'}});
        }
    }

    componentDidMount() {
        //使navigation里的this指向最外部的this
        this.props.navigation.setParams({navigatePress:this.rightItemClick})

        //取用户登录信息
        storage.load({
            key:'userInfo',
            autoSync: false,
        })
            .then((res)=> {
                console.log(res);
                this.setState({'userInfo':res});
                this.userAuth(res.userid);
            })
            .catch((err)=>console.log(err));
    }
    userAuth(userId) {
         //请求用户认证信息
         let url = 'http://apisandbox.zoomlion.com/app-web/Client/comminterface.htm';
         let params = {
           funId: 'checkIfUserRegister',
           userId:userId,
         };
     
         YXNetwork.postJson(url,params,(resp)=>{
            console.log(resp);
            if (resp.status === '1') {
                for (const userAuths of resp.userAuthenStatus) {
                    if (userAuths.type === '2') {//公司
                        if (userAuths.authenStatus === 'E002' ||
                            userAuths.authenStatus === 'E0002') {//已认证
                            this.setState({companyAuth:'已认证',companyUrl:'http://apisandbox.zoomlion.com/e_contract/index.html#/company-auth'});
                        }else if (userAuths.authenStatus === 'E0001') {//审核中
                            this.setState({companyAuth:'审核中',companyUrl:''});
                        }else if (userAuths.authenStatus === 'E003') {//已过期
                            this.setState({companyAuth:'已过期',companyUrl:'http://apisandbox.zoomlion.com/e_contract/index.html#/auth-send-message?authType=1'});
                        }
                    }
                    if (userAuths.type === '3') {//个人
                        if (userAuths.authenStatus === 'E002') {//已认证
                            this.setState({personAuth:'已认证',personUrl:'http://apisandbox.zoomlion.com/e_contract/index.html#/personal-auth'});
                        }else if (userAuths.authenStatus === 'E003') {//已过期
                            this.setState({personAuth:'已过期',personUrl:'http://apisandbox.zoomlion.com/e_contract/index.html#/auth-send-message?authType=1'});
                        }
                    }
               }
                
            }
         });
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