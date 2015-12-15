// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
'use strict';

//Ionic cnodejs App
//angular.module('zeus',['ionic','zeus.controllers','zeus.filters','zeus.directives','zeus.config'])
angular.module('zeus', [
  'ionic',
  'angularMoment',
  'zeus.controllers',
  'zeus.filters',
  'zeus.directives',
  'zeus.config'])

  .run(function ($ionicPlatform, $log, $timeout, $state, $rootScope, amMoment, ENV, User, Push) {

    //set moment locale
    amMoment.changeLocale('zh-cn');

    //notify
    if (!navigator.notification) {
      navigator.notification = {
        alert: function (message) {
          window.alert(message);
        }
      };
    }
    //push notification callback
    var notificationCallback = function (data, isActive) {
      $log.debug(data);
      var notif = angular.fromJson(data);

      if (notif.extras) {
        //android
        if (notif.extras['cn.jpush.android.EXTRA']['topicId']) {
          $state.go('app.topic', {
            id: notif.extras['cn.jpush.android.EXTRA']['topicId']
          });
        } else {
          $state.go('app.messages');
        }
      } else {
        //IOS
        if (notif.topicId) {
          if (isActive) {
            $rootScope.getMessageCount();
          } else {
            $state.go('app.topic', {id: notif.topicId});
          }
        } else {
          $state.go('app.messages');
        }
      }
    };

    $ionicPlatform.ready(function () {
      if (window.cordova) {
        //setup google analytics
        if (window.analytics && ENV.name === 'production') {
          window.analytics.startTrackerWithId('UA-69059946-1');
        }

        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }

      }

      // push handler
      Push.init(notificationCallback);

      //delete current user have not set alias of jpush
      var currentUser = User.getCurrentUser();
      if (currentUser.id) {
        Push.setAlias(currentUser.id);
      }

      if(navigator.splashscreen){
        $timeout(function(){
          navigator.splashscreen.hide();

          //check if have push after app launch
          Push.check();
        },100);
      }else{
        $log.debug('no splash screen plugin');
      }

      /*if (window.StatusBar) {
       // org.apache.cordova.statusbar required
       StatusBar.styleDefault();
       }*/
    });
  })

  .config(function (ENV,$stateProvider, $urlRouterProvider,$logProvider) {

    $logProvider.debugEnabled(ENV.debug);

    $stateProvider

      .state('app', {
        url: '',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
      })

      .state('app.user', {
        url: '/user/:loginname',
        views: {
          'menuContent': {
            templateUrl: 'templates/user.html',
            controller: 'UserCtrl'
          }
        }
      })
      .state('app.messages', {
        url: '/my/messages',
        views: {
          'menuContent': {
            templateUrl: 'templates/messages.html',
            controller: 'MessagesCtrl'
          }
        }
      })
      .state('app.topics',{
        url:'/topics/:tab',
        views:{
          'menuContent':{
            templateUrl:'templates/topics.html',
            controller:'TopicsCtrl'
          }
        }
      })

      .state('app.topic', {
        url: '/topic/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/topic.html',
            controller: 'TopicCtrl'
          }
        }
      })
      .state('app.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/settings.html',
            controller: 'SettingsCtrl'
          }
        }
      })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/topics/all');
  });

//setter custom's module
angular.module('zeus.controllers', ['zeus.services']);

angular.module('zeus.services', ['ngResource', 'zeus.config']);
angular.module('zeus.filters', ['zeus.services']);

angular.module('zeus.directives', []);
