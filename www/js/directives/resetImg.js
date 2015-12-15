/**
 * Created by Sloong on 2015/10/20.
 */
'use strict';

angular.module('zeus.directives').directive(
  // Collection-repeat image recycling while loading
  // https://github.com/driftyco/ionic/issues/1742
  'resetImg', function ($document) {
    return {
      restrict: 'A',
      link: function($scope, $element, $attributes) {
        var applyNewSrc = function (src) {
          var newImg = $element.clone(true);

          newImg.attr('src', src);
          $element.replaceWith(newImg);
          $element = newImg;
        };

        $attributes.$observe('src', applyNewSrc);
        $attributes.$observe('ngSrc', applyNewSrc);
      }
    };
  }
);
