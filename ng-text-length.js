(function(angular) {
  'use strict';

  var app = angular.module('textLength', []);

  // Strings that are not wrapped as HTML provoke that jqLite treats them as CSS selectors
  function getText(viewValue) {
    try {
      return angular.element(viewValue).text()
    } catch (e) {
      return viewValue
    }
  }

  /**
   * @ngdoc directive
   * @name minTextLength
   *
   * @description
   *
   * More or equal than
   */
  app.directive('minTextLength', ['$sce', function($sce) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, elem, attrs, ctrl) {
        if (! ctrl) return;

        var min;

        attrs.$observe('minTextLength', function(value) {
          min = parseInt(value, 10)
          ctrl.$validate()
        })

        ctrl.$validators.minTextLength = function(_modelValue, viewValue) {

          // Avoids problems with undefined and null values
          if (ctrl.$isEmpty(viewValue))
            return min == 0

          // Only convert to text and check its length when the HTML length is enough
          return viewValue.length >= min && getText(viewValue).length >= min
        }
      }
    }
  }])

  /**
   * @ngdoc directive
   * @name maxTextLength
   *
   * @description
   *
   * Based on the textMinLength
   *
   * Less or equal
   */
  app.directive('maxTextLength', ['$sce', function($sce) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function(scope, elem, attrs, ctrl) {
        if (! ctrl) return;

        var max;

        attrs.$observe('maxTextLength', function(value) {
          max = parseInt(value, 10)
          ctrl.$validate()
        })

        ctrl.$validators.maxTextLength = function(_modelValue, viewValue) {

          // Avoids problems with undefined and null values
          if (ctrl.$isEmpty(viewValue))
            return max >= 0

          // Only convert to text and check its length when the HTML length is enough
          return viewValue.length <= max || getText(viewValue).length <= max
        }
      }
    }
  }])

})(window.angular)
