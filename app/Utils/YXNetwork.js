
import DeviceInfo from 'react-native-device-info'
import md5 from 'react-native-md5'
import moment from 'moment'
 
    //post请求
    /**
     *url :请求地址
    *data:参数
    *callback:回调函数
    */
    function postFrom(url, data, callback) {
        var fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:'data='+data+''//这里我参数只有一个data,大家可以还有更多的参数
        };
        
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            callback(JSON.parse(responseText));
        }).done();
    }
    /**
    *url :请求地址
    *data:参数(Json对象)
    *callback:回调函数
    */
    function postJson (url, data, callback) {
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                //json形式
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(publickParams(data))
        };
        
        fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            callback(JSON.parse(responseText));
        }).done();
    }
    //get请求
    /**
    *url :请求地址
    *callback:回调函数
    */
    function get(url, callback) {
        
        fetch(url)
        .then((response) => response.text())
        .then((responseText) => {
            callback(JSON.parse(responseText));
        }).done();
    }

    function publickParams(data) {
        console.log('data='+data);
        let mobileImei = DeviceInfo.getUniqueID();
        console.log('mobileImei='+mobileImei);

        let date = moment().format('YYYYMMDD')
        let randomx = Math.random()%1000000000;
        let requestId = date+randomx;
        console.log('requestId='+requestId);
        
        let md5Value = md5.hex_md5(requestId+mobileImei+'ZOOMLIONAPP');
        console.log('md5Value='+md5Value);

        let versionCode = DeviceInfo.getVersion();
        console.log('versionCode='+versionCode);

        let versionName = DeviceInfo.getBuildNumber();
        console.log('versionName='+versionName);

        let strDeviceToken = '966794aace350e13829c27eb315f6f45d6e163ed6fb85718e1ef67cc7ae920b3';

        var params = {
            "channelNo" : "IOS_APP",
            // "funId" : _funId,
            "mobileImei" : mobileImei,
            "requestId" : requestId,
            "md5Value" : md5Value,
            "versionCode" : versionCode,
            "versionName" : versionName,
            "deviceToken" : strDeviceToken,
            "clientType" : "APP_NORMAL" ,
            "partnerNo" : "zoomlion"
        }
        Object.assign(params,data);
        console.log(params);
        return params;
    }

export default {
    get,
    postJson,
    postFrom,
};