/**
 * Created by Sloong on 2015/10/20.
 */
'use strict';

angular.module('zeus.controllers')
  .controller('SettingsCtrl',function($scope,$log,ENV,Settings){
    $log.log('settings ctrl ');
    //before enter view event
    $scope.$on('$ionicView.beforeEnter', function() {
      // track view
      if (window.analytics) {
        window.analytics.trackView('settings view');
      }
    });

    //$scope.now = new Date();

    // save settings on destroy
    $scope.$on('$stateChangeStart',function(){
      $log.debug('settings controller on $stateChangeStart');
      Settings.save();
    })
  });
