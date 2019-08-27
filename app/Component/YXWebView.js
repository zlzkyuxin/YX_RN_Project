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
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import { isIphoneX } from '../Utils/YXUtils'
import { WebView } from 'react-native-webview'

const {width,height} = Dimensions.get('window');
const TOP_Height = Platform.OS === 'ios' ? (isIphoneX() ? 44 : 20) : 0;

class YXWebView extends React.Component {

    static navigationOptions = ({navigation}) => {
        return {
            title:navigation.getParam('title', '消息'),
            header: null,
        }
    };

    render() {
        var jsonData = this.props.navigation.getParam('otherParam');
        // let setSession = `document.cookie='JSESSIONID=7FF3CF3D6DE1D6283B243F659D13BB45';
        // sessionStorage.setItem('userInfo','{"userId":"23464342469120","mobile":"13787171246","mobileImei":"922022267a737be7d9d9d36b97e565072e8930c1","requestId":"20190823810301453","md5Value":"B110F380EF7A4FEF967487CAA5C59CB1"}');`;
        return(
            // <SafeAreaView style={{backgroundColor: '#ccc'}}>
            <View style={{flex:1,backgroundColor:'#76cb07'}}>
                <WebView
                    source={{uri:jsonData.nextUrl, method: 'GET', headers: { 'Cache-Control':'no-cache'} }}
                    // injectedJavaScript={`${setSession}`}
                    style={styles.webviewStyle}
                    onLoadProgress={e => console.log(e.nativeEvent.progress)}
                    startInLoadingState={true}
                    renderLoading={()=>(
                        <View style={styles.wrapper}>
                            <View style={styles.box}>
                                <Text style={styles.txt}>正在加载...</Text>
                            </View>
                        </View>
                    )}
                    mixedContentMode={"always"}
                    onError={()=>console.log('加载失败！')}
                    onLoad={()=>console.log('加载成功!')}
                    onMessage={(e)=>{
                        console.log(e);
                    }}
                />
            </View>
                
            //  </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    webviewStyle: {
        position: 'absolute',
        top: TOP_Height,
        width: width,
        height: height - TOP_Height,
        backgroundColor: 'orange'
    },
    wrapper:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        height:Dimensions.get('window').height,
        width:Dimensions.get('window').width,
        zIndex:10,
    },
    box:{
        paddingVertical:12,
        paddingHorizontal:20,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'rgba(0,0,0,0.6)',
        borderRadius:6
    },
    txt:{
        // marginLeft:20,
        fontSize:14,
        color: 'white'
    }
})

export default YXWebView;