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
    FlatList,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';

const {width,height} = Dimensions.get('window');

class YXMessage extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', '消息'),
        }
    }
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList
                    data={[
                        {key: '1',title:'系统通知',icon:'http://baoma2016.zoomlion.com/steady_source/upload/image/serviceapp/messagecenter/icon_tz.png',detail:'暂无消息'},
                        {key: '2',title:'设备异常提醒',icon:'http://baoma2016.zoomlion.com/steady_source/upload/image/serviceapp/messagecenter/icon_tx.png',detail:'暂无消息'},
                        {key: '3',title:'保养提醒',icon:'http://baoma2016.zoomlion.com/steady_source/upload/image/serviceapp/messagecenter/icon_tz.png',detail:'暂无消息'},
                        {key: '4',title:'服务提醒',icon:'http://baoma2016.zoomlion.com/steady_source/upload/image/serviceapp/messagecenter/icon_fwtx.png',detail:'暂无消息'},
                        {key: '5',title:'解锁机消息',icon:'http://baoma2016.zoomlion.com/steady_source/upload/image/serviceapp/messagecenter/icon_jsj.png',detail:'暂无消息'},
                        {key: '6',title:'回款通知',icon:'http://baoma2016.zoomlion.com/steady_source/upload/image/serviceapp/messagecenter/icon_hk.png',detail:'暂无消息'},
                        {key: '7',title:'电子签章通知',icon:'http://baoma2016.zoomlion.com/steady_source/upload/image/serviceapp/messagecenter/icon_dzqz.png',detail:'暂无消息'},
                    ]}
                    renderItem={({item}) => this.renderItem(item)}
                />
            </View>
        );
    }  

    renderItem(item) {
        return(
            <TouchableOpacity
                onPress={()=>alert('当前点击了:'+item.title)}
            >
                <View style={styles.renderItemStyle}>
                    <Image 
                            source={{uri:item.icon}}
                            style={styles.iconStyle}
                    />
                    <View style={styles.textStyle}>
                        <Text style={{color:'#333',fontSize: 17}}>{item.title}</Text>
                        <Text style={{color:'#666',fontSize: 13}}>{item.detail}</Text>
                    </View>
                    <View style={styles.lineStyle}></View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    renderItemStyle: {
        backgroundColor: 'white',
        width:width,
        height:66,
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconStyle: {
        marginLeft: 12,
        width: 44,
        height: 44,
    },
    textStyle: {
        paddingLeft: 16,
        height: 44,
        // backgroundColor: '#f40',
        justifyContent: 'space-around',
    },
    lineStyle: {
        backgroundColor: '#e7e7e7',
        height: 0.8,
        width: width - 72,
        marginLeft: 72,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
});


export {YXMessage as default};