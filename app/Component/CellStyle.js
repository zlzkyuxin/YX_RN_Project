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


//样式一致的cell
function renderSectionItem2(item, index, section) {
   
}

function renderItem(item) {
    
}

const styles = StyleSheet.create({

    renderItemStyle: {
        backgroundColor: 'white',
        width:width,
        height:44,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    titleStyle: {
        fontSize: 17,
        color: '#333',
        height: 44,
        lineHeight: 44,
        paddingLeft: 12,
    },
    logoutStyle: {
        backgroundColor: 'white',
        fontSize: 17,
        color: 'red',
        width: width,
        height: 44,
        lineHeight: 44,
        textAlign: 'center',
    },
    iconStyle: {
        width: 17,
        height: 17,
        // marginRight: 12,
        alignItems: 'center',
        // backgroundColor: 'green',
        position: 'absolute',
        zIndex: 99,
        right: 12,
    },
    rightNameStyle: {
        position: 'absolute',
        right: 20,
    },
    switchStyle: {
        marginRight: 12,
    },
    lineStyle: {
        backgroundColor: '#e7e7e7',
        height: 0.8,
        width: width,
        position: 'absolute',
        bottom: 0,
        left: 0,
    },

    topViewStyle: {
        height: 70,
        backgroundColor: 'white',
        width:width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    leftViewStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topLeftViewStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 20,
        // backgroundColor: '#f40',
    },
    topTextStyle: {
        height: 40,
        fontSize: 18,
        marginLeft: 10,
        justifyContent: 'space-between',

    },
    leftIconStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
        alignItems: 'center',
    },
    rightIconStyle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginLeft: 10,
        alignItems: 'center',
    },
});

module.exports = {
    topSectionCell: (item,index,section) => {
        return (
            <View style={styles.topViewStyle}>
                <View style={styles.leftViewStyle}>
                    <Image 
                        source={{uri:item.iconName}}
                        style={styles.leftIconStyle}
                    />
                    <View style={styles.topTextStyle}>
                        <Text style={{color:'#333'}}>{item.leftName}</Text>
                        <Text style={{color:'#666'}}>{item.bottomName}</Text>
                    </View>
                </View>
                {
                    item.isShowRightIcon ?  
                    (<Image 
                        source={{uri:'arrow_right'}}
                        style={styles.iconStyle}
                    />) : 
                    <Text></Text>
                }
                <View style={styles.lineStyle}></View>
            </View>
        )
    },
    normalSectionCell: (item,index,section) => {
        return(
            <View style={styles.renderItemStyle}>
                <Text style={item.leftName === '退出' ? styles.logoutStyle : styles.titleStyle}>{item.leftName}</Text>
                {
                    item.rightName ?
                    (<Text style={{
                        position:'absolute',
                        alignItems: 'center',
                        right:item.isShowRightIcon ? 22 : 10
                    }}>
                        {item.rightName}
                    </Text>
                    ) :
                    <Text></Text>
                }
                {
                    item.isShowRightIcon ?  
                    (<Image 
                        source={{uri:'arrow_right'}}
                        style={styles.iconStyle}
                    />) : 
                    <Text></Text>
                }
                <View style={styles.lineStyle}></View>
            </View>
        )
    },
    topCell: (item) => {
        return (
            <View style={styles.topViewStyle}>
                <View style={styles.topLeftViewStyle}>
                    <Text style={styles.titleStyle}>{item.leftName}</Text>
                    <Image 
                        source={{uri:item.iconName}}
                        style={styles.rightIconStyle}
                    />
                </View>
                {
                    item.isShowRightIcon ?  
                    (<Image 
                        source={{uri:'arrow_right'}}
                        style={styles.iconStyle}
                    />) : 
                    <Text></Text>
                }
                <View style={styles.lineStyle}></View>
            </View>
        )
    },
    normalCell: (item) => {
        return(
            <View style={styles.renderItemStyle}>
                <Text style={styles.titleStyle}>{item.leftName}</Text>
                {
                    item.rightName ?
                    (<Text style={{
                        position:'absolute',
                        alignItems: 'center',
                        right:item.isShowRightIcon ? 22 : 10
                    }}>
                        {item.rightName}
                    </Text>
                    ) :
                    <Text></Text>
                }
                {
                    item.isShowRightIcon ?  
                    (<Image 
                        source={{uri:'arrow_right'}}
                        style={styles.iconStyle}
                    />) : 
                    <Text></Text>
                }
                <View style={styles.lineStyle}></View>
            </View>
        )
    },
};