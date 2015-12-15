/**
 * Created by Sloong on 2015/10/21.
 */
'use strict';

angular.module('zeus.controllers')
  .controller('MessagesCtrl',function($scope,$log,$stateParams,$rootScope,Messages){
    $log.log('messages ctrl');

    //before enter view event
    $scope.$on('$ionicView.beforeEnter',function(){
      //track view
      if(window.analytics){
        window.analytics.trackView('message view');
      }

      //load messages
      loadMessages();
    });

    var loadMessages = function(){
      Messages.getMessages().$promise.then(function(response){
        $scope.messages = response.data;
        if($scope.messages.hasnot_read_messages.length === 0){
          $rootScope.$broadcast('messagesMarkedAsRead');
        } else{
          Messages.markAll().$promise.then(function(response){
            $log.debug('mark all response:', response);
            if(response.success){
              $rootScope.$broadcast('messagesMarkedAsRead');
            }
          },function(response){
            $log.debug('mark all response error:' , response);
          });
        }
      },function(response){
        $log.debug('get messages response error', response);
      });
    }
  });
