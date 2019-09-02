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
    Button,
    TouchableOpacity,
    Dimensions,
    StyleSheet
} from 'react-native';
import {
    MapView, 
    MapTypes, 
    Geolocation, 
    Overlay
} from 'react-native-baidu-map'

const {width,height} = Dimensions.get('window');
const { 
    Arc,
    Circle,
    Polygon,
    Polyline,
    Marker,
    InfoWindow
 } = Overlay;

class YXMap extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('title', '地图'),
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            mapClickResp : '',
            MapPoiClickResp : '',
        };
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <MapView 
                    width={width} 
                    height={400} 
                    zoom={18}
                    trafficEnabled={true}
                    zoomControlsVisible={true}
                    mapType={MapTypes.NORMAL}
                    center={{ longitude: 112.895758, latitude: 28.222 }}
                    onMapClick={(data)=>{
                        console.log(data);
                        this.setState({mapClickResp:data});
                    }}
                    // onMarkerClick={(data)=>{console.log(data)}}
                    onMapPoiClick={(data)=>{
                        console.log(data);
                        this.setState({MapPoiClickResp:data});
                    }}
                >
                    <Marker
                       title='中联e管家'
                       location={{ longitude: 112.895758, latitude: 28.222 }}
                       icon={{uri:'icon_home2'}}
                    >
                    </Marker>
                </MapView>
                <Button 
                   onPress={this.onPressLearnMore}
                   title="Learn More"
                   color="#841584"
                   accessibilityLabel="Learn more about this purple button"
                >
                </Button>
                <Text style={{alignItems:'center',color:'#333',fontSize:17}}>{JSON.stringify(this.state.mapClickResp)}</Text>
                <Text style={{alignItems:'center',color:'#f40',fontSize:20}}>{JSON.stringify(this.state.MapPoiClickResp)}</Text>
            </View>
        );
    }  
    onPressLearnMore() {
        console.log('调用了locaitonToStr');
        Geolocation.reverseGeoCode(112.895758,28.222)
                    .then(data => {
                        console.log('reverseGeoCode',data);
                    })
                    .catch(e =>{
                        console.warn(e, 'error');
                    }) 
    }
}

const styles = StyleSheet.create({
   
});


export {YXMap as default};