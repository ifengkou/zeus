/**
 * Created by Sloong on 2015/10/20.
 */
'use strict';

angular.module('zeus.services')
  .factory('Tabs',function(){
    return [
      {
        value:'all',
        label:'最新'
      },
      {
        value:'share',
        label:'分享'
      },
      {
        value:'ask',
        label:'问答'
      },
      {
        value:'job',
        label:'招聘'
      },
      {
        value:undefined,
        label:'其他'
      }
    ];
  });
