import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { 
  createAppContainer, 
  createStackNavigator, 
  createBottomTabNavigator,
  StackActions, 
  NavigationActions
} from 'react-navigation'; // Version can be specified in package.json

import YXHome from '../Home/YXHome'
import YXMessage from '../Message/YXMessage'
import YXMine from '../Mine/YXMine'
import YXDevice from '../Device/YXDevice'
import YXAdd from '../Add/YXAdd'
import YXUserCenter from '../Mine/YXUserCenter'
import YXWebView from '../Component/YXWebView'
import YXMap from '../Map/YXMap'
import YXCompany from '../Mine/Company/YXCompany'
import YXAbout from '../Mine/About/YXAbout'
import YXSuggest from '../Mine/Suggest/YXSuggest'
import YXModifyMobile from '../Mine/ModifyMobile/YXModifyMobile'
import YXModifyPassword from '../Mine/ModifyPassword/YXModifyPassword'
import YXSetting from '../Mine/Setting/YXSetting'
import YXLogin from '../Login/YXLogin';


const TabBarItem = [
  {tabtitle:'首页',icon:{uri:'icon_home1'},selectIcon:{uri:'icon_home2'},navTitle:'首页'},
  {tabtitle:'设备',icon:{uri:'icon_shebei1'},selectIcon:{uri:'icon_shebei2'},navTitle:'设备'},
  {tabtitle:'消息',icon:{uri:'icon_message1'},selectIcon:{uri:'icon_message2'},navTitle:'消息'},
  {tabtitle:'我的',icon:{uri:'icon_user1'},selectIcon:{uri:'icon_user2'},navTitle:'我的'},
  // ['首页',{uri:'icon_home1'},{uri:'icon_home2'},'首页'],
  // ['设备',{uri:'icon_shebei1'},{uri:'icon_shebei2'},'设备'],
  // ['消息',{uri:'icon_message1'},{uri:'icon_message2'},'消息'],
  // ['我的',{uri:'icon_user1'},{uri:'icon_user2'},'我的'],
];

const HomeNavigator = createStackNavigator({
  Home: YXHome,
  Detail: YXMessage,
  Map: YXMap,
  Login: YXLogin
},{
  initialRouteName:'Home',
  // navigationOptions: ({navigation}) => navigationOptions(navigation,'首页',{uri : 'icon_home1'},{uri:'icon_home2',},'首页'),
  defaultNavigationOptions: ()=> defaultNavigationOptions('首页'),
});

const DeviceNavigator = createStackNavigator({
  Shop: YXDevice,
},{
  // navigationOptions: ({navigation}) => navigationOptions(navigation,'设备', {uri:'icon_shebei1'}, {uri:'icon_shebei2'},'设备'),
  defaultNavigationOptions: () => defaultNavigationOptions('设备'),
});

const AddNavigator = createStackNavigator({
  Shop: YXAdd,
},{
  navigationOptions: ({navigation}) => navigationOptions(navigation,' ',{uri : 'icon_add'},{uri:'icon_add'},''),
  defaultNavigationOptions: () => defaultNavigationOptions('设备'),
});

const MessageNavigator = createStackNavigator({
  Mine: YXMessage,
},{
  // navigationOptions: ({navigation}) => navigationOptions(navigation,'消息',{uri : 'icon_message1'},{uri:'icon_message2'},'消息'),
  defaultNavigationOptions: () => defaultNavigationOptions('消息'),
});

const MineNavigator = createStackNavigator({
  More: YXMine,
  UserCenter: YXUserCenter,
  WebView: YXWebView,
  Company: YXCompany,
  About: YXAbout,
  ModifyMobile: YXModifyMobile,
  ModifyPassword: YXModifyPassword,
  Setting: YXSetting,
  Suggest: YXSuggest,
},{
  // navigationOptions: ({navigation}) => navigationOptions(navigation,'我的',{uri : 'icon_user1'},{uri:'icon_user2'},'我的'),
  defaultNavigationOptions: () => defaultNavigationOptions('我的'),
});

//设置标题、颜色、图标、等
const navigator = [HomeNavigator, DeviceNavigator, MessageNavigator, MineNavigator]
navigator.forEach((item,index) => {

  //navigationOptions
  item.navigationOptions = ({ navigation }) => {
    
      const tabBarLabel = TabBarItem[index].tabtitle;
      const tabBarIcon = (({tintColor,focused}) => {
        return(
          <Image 
            source={!focused ? TabBarItem[index].icon : TabBarItem[index].selectIcon}
            style={[{height:30,width:30}, {tintColor: tintColor}]}
          />
        )
      });
      const headerTitle = TabBarItem[index].navTitle;
      let tabBarVisible = true
      if (navigation.state.index > 0) {
        tabBarVisible = false
      }
      return {tabBarLabel,tabBarIcon,tabBarVisible};
  };
});

const defaultNavigationOptions = (title,...colorParams) => {
    const headerTitle = title;
    [color='white',backgroundColor='#76cb07'] = colorParams;
    const headerTitleStyle = {color:color,alignSelf:'center'};
    const headerStyle = {backgroundColor:backgroundColor};
    const headerTintColor = 'white';
    const headerBackTitle= null;
    // const headerTruncatedBackTitle= '';
    // const headerBackTitleStyle = {color:'white'};
    return {headerTitleStyle,headerStyle,headerBackTitle,headerTintColor};
}

const navigationOptions = (navigation,tabBarTitle,normalImage,selectedImage,navTitle) => {
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused}) => {
      return(
        <Image 
          source={!focused ? normalImage : selectedImage}
          style={[{height:30,width:30}, {tintColor: tintColor}]}
        />
      )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = {fontSize:22,color:'white',alignSelf:'center'};
    const headerStyle = {backgroundColor:'#76cb07'};
    let tabBarVisible = true
    if (navigation.state.index > 0) {
      tabBarVisible = false
    }
    return {tabBarLabel,tabBarIcon,tabBarVisible};
};


const TabNavigation = createBottomTabNavigator({
  First: HomeNavigator,
  Second: DeviceNavigator,
  // Center : AddNavigator,
  Third: MessageNavigator,
  Four: MineNavigator,
},{
    tabBarPosition:'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
    swipeEnabled:false, // 是否允许在标签之间进行滑动。
    animationEnabled: false, // 是否在更改标签时显示动画。
    lazy:true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
    initialRouteName:'First', // 设置默认的页面组件
    backBehavior:'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    tabBarOptions:{
        // iOS属性
        // 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
        activeTintColor:'#76cb07', // label和icon的前景色 活跃状态下（选中）。
        inactiveTintColor:'#c7cfd1', // label和icon的前景色 不活跃状态下(未选中)。

        activeBackgroundColor:'#f8f8f8', //label和icon的背景色 活跃状态下（选中） 。
        inactiveBackgroundColor:'#f8f8f8', // label和icon的背景色 不活跃状态下（未选中）。

        showLabel:true, // 是否显示label，默认开启。
        // style:{}, // tabbar的样式。
        // labelStyle:{}, //label的样式。

        // 安卓属性

        // activeTintColor:'', // label和icon的前景色 活跃状态下（选中） 。
        // inactiveTintColor:'', // label和icon的前景色 不活跃状态下(未选中)。
        showIcon:true, // 是否显示图标，默认关闭。
        // showLabel:true, //是否显示label，默认开启。
        // style:{}, // tabbar的样式。
        // labelStyle:{}, // label的样式。
        upperCaseLabel:false, // 是否使标签大写，默认为true。
        // pressColor:'', // material涟漪效果的颜色（安卓版本需要大于5.0）。
        // pressOpacity:'', // 按压标签的透明度变化（安卓版本需要小于5.0）。
        // scrollEnabled:false, // 是否启用可滚动选项卡。
        // tabStyle:{}, // tab的样式。
        // indicatorStyle:{}, // 标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题。
        // labelStyle:{}, // label的样式。
        // iconStyle:{}, // 图标的样式。
    }
});

export default createAppContainer(TabNavigation);