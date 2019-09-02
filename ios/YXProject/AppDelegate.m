/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
//#import <React/RCTPushNotificationManager.h>
#import <RNCPushNotificationIOS.h>
#import "BaiduMapViewManager.h"
#import "RNUMConfigure.h"
#import "Category/UMComponents/UMPush.framework/Headers/UMessage.h"
@interface AppDelegate()

@property (nonatomic , strong) RCTRootView *rootView;

@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  _rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"YXProject"
                                            initialProperties:nil];

  _rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  //友盟参数设置
  [self UMPushConfigureSetting:launchOptions];
  
  //百度地图配置
  [BaiduMapViewManager initSDK:@"bf6Ozvi4V0iusULQd9rF3x9oXMu6hzxw"];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = _rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

//友盟参数设置
- (void)UMPushConfigureSetting:(NSDictionary *)launchOptions {
  [UMConfigure setLogEnabled:NO];
  [RNUMConfigure initWithAppkey:@"5d67215d570df3563f0000f2" channel:@"App Store"];
  
  [UMessage openDebugMode:NO];
  UMessageRegisterEntity *entity = [[UMessageRegisterEntity alloc] init];
  entity.types = UMessageAuthorizationOptionAlert |
                 UMessageAuthorizationOptionBadge |
                 UMessageAuthorizationOptionSound;
  [UNUserNotificationCenter currentNotificationCenter].delegate = self;
  [UMessage registerForRemoteNotificationsWithLaunchOptions:launchOptions Entity:entity completionHandler:^(BOOL granted, NSError * _Nullable error) {
    if (granted) {
      
    }else {
      
    }
  }];
}

//Called when a notification is delivered to a foreground app.
-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
{
  NSDictionary * userInfo = notification.request.content.userInfo;
  
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    
//    //创建通知
//    NSNotification *notification =[NSNotification notificationWithName:@"remoteNotification" object:nil userInfo:userInfo];
//
//    //通过通知中心发送通知
//    [[NSNotificationCenter defaultCenter] postNotification:notification];
    
    //应用处于前台时的远程推送接受
    //关闭友盟自带的弹出框
    [UMessage setAutoAlert:NO];
    //必须加这句代码
    [UMessage didReceiveRemoteNotification:userInfo];
    
  }else{
    //应用处于前台时的本地推送接受
    
  }
  completionHandler(UNAuthorizationOptionSound | UNAuthorizationOptionAlert | UNAuthorizationOptionBadge);
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
{
  [RNCPushNotificationIOS didRegisterUserNotificationSettings:notificationSettings];
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
  NSLog(@"didRegisterForRemoteNotificationsWithDeviceToken success");
  
  if (![deviceToken isKindOfClass:[NSData class]]) return;
  
  const unsigned *tokenBytes = [deviceToken bytes];
  
  NSString *hexToken = [NSString stringWithFormat:@"%08x%08x%08x%08x%08x%08x%08x%08x",ntohl(tokenBytes[0]),ntohl(tokenBytes[1]),ntohl(tokenBytes[2]),ntohl(tokenBytes[3]),ntohl(tokenBytes[4]),ntohl(tokenBytes[5]),ntohl(tokenBytes[6]),ntohl(tokenBytes[7])];
  
  NSLog(@"%@",hexToken);
//  //保存token
//  [[NSUserDefaults standardUserDefaults] setObject:hexToken forKey:@"deviceToken"];
//  [[NSUserDefaults standardUserDefaults] synchronize];
  
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(5 * NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
  
    _rootView.appProperties = @{@"deviceToken":hexToken};
    [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
  });
  
}
// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
// Required for the registrationError event.
- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
{
  [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
}
// Required for the localNotification event.
- (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
{
  [RNCPushNotificationIOS didReceiveLocalNotification:notification];
}
@end
