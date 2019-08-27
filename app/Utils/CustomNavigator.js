import {
    StackActions,
    NavigationActions
} from 'react-navigation';

let _navigator;

function setCustomNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function goBack() {
    _navigator.dispatch(
        NavigationActions.back()
    );
}

function reset(routeName, params) {
    _navigator.dispatch(
        StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName,
                    params,
                })
            ]
        }),
    )
}

export default {
    navigate,
    goBack,
    reset,
    setCustomNavigator,
};