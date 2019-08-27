import {
    Dimensions,
    Platform,
    NativeModules,
    DeviceInfo
} from 'react-native';

const IphoneX_Width = 375;
const IphoneX_Height = 812;

const { width, height } = Dimensions.get('window');
const {PlatformConstants = {}} = NativeModules;
const {mitor = 0} = PlatformConstants.reactNativeVersion || {};

module.exports = {
    isIphoneX: () => {
        if (Platform.OS === 'web') return false;
        if (mitor >= 50) {
            return DeviceInfo.isIPhoneX_deprecated;
        }
        return (
            Platform.OS === 'ios' && ((IphoneX_Height === height && IphoneX_Width === width) || (IphoneX_Height === width && IphoneX_Width === height))
        );
    }
};