/**
 * Created by Sloong on 2015/10/16.
 */
(function(){
  'use strict';

  angular.module('zeus.services')
    .factory('Storage',function(){
      return {
        set:function(key,data){
          return window.localStorage.setItem(key,window.JSON.stringify(data));
        },
        get:function(key){
          return window.JSON.parse(window.localStorage.getItem(key));
        },
        remove:function(key){
          return window.localStorage.removeItem(key);
        }
      }
    });
})();
