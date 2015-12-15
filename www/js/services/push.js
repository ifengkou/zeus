/**
 * Created by Sloong on 2015/10/16.
 */
(function(){
  'use strict';
  angular.module('zeus.services')
    .factory('Push',function(ENV,$log){
      var push;
      return {
        setBadge:function(badge){
          if(push){
            $log.debug('jpush:set badge',badge);
            plugins.jPushPlugin.setBadge(badge);
          }
        },
        setAlias:function(alias){
          if(push){
            $log.debug('jpush:set alias',alias);
            plugins.jPushPlugin.setAlias(alias);
          }
        },
        check:function(){
          if(window.jpush && push){
            plugins.jPushPlugin.receiveNotificationIniOSCallback(window.jpush);
            window.jpush = null;
          }
        },
        init:function(notificationCallback){
          $log.debug('jpush: init');
          plugins.jPushPlugin.init();
          plugins.jPushPlugin.setDebugMode(ENV.debug);
          plugins.jPushPlugin.openNotificationInAndroidCallback = notificationCallback;
          plugins.jPushPlugin.receiveNotificationIniOSCallback = notificationCallback;
        }
      }
    })
})();
