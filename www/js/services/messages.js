/**
 * Created by Sloong on 2015/10/21.
 */

'use strict';

angular.module('zeus.services')
.factory('Messages',function(ENV,$resource,$log,User){
    var messages = {};
    var messagesCount = 0;
    var resource = $resource(ENV.api+'/messages',null,{
      count:{
        method:'get',
        url:ENV.api+'/message/count'
      },
      markAll:{
        method:'post',
        url:ENV.api + '/message/mark_all'
      }
    });

    return {
      currentMessageCount:function(){
        return messagesCount;
      },
      getMessageCount:function(){
        $log.debug('get messages count');
        var currentUser = User.getCurrentUser();
        return resource.count({
          accesstoken:currentUser.accesstoken
        });
      },
      getMessages:function(){
        $log.debug('get message');

        var currentUser = User.getCurrentUser();
        return resource.get({
          accesstoken:currentUser.accesstoken
        });
        //return messages;
      },
      markAll:function(){
        $log.debug('mark all as read');
        var currentUser = User.getCurrentUser();
        return resource.markAll({
          accesstoken:currentUser.accesstoken
        },function(response){
          $log.debug('marked messages as read:', response);
          messagesCount = 0;
        });
      }
    };
  });
