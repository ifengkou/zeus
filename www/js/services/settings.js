/**
 * Created by Sloong on 2015/10/20.
 */
'use strict';

angular.module('zeus.services')
  .factory('Settings', function (ENV, $resource, $log, Storage) {
    var storageKey = 'settings';
    var settings = Storage.get(storageKey) || {
        sendFrom: false,
        saverMode: false
      };
    return {
      getSettings:function(){
        $log.debug('get settings',settings);
        return settings;
      },
      save:function(){
        Storage.set(storageKey,settings);
      }
    }
  });
