(function(angular) {
  'use strict';

  var app = angular.module('ngTextLength', []);

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

          // Strings that are not wrapped as HTML provoke that jqLite treats them as CSS selectors
          var html;
          try {
            html = angular.element(viewValue)
          } catch (e) {
            html = angular.element('<hack>'+ viewValue +'</hack>')
          }

          // Only convert to text and check its length when the HTML length is enough
          return viewValue.length >= min && html.text().length >= min
        }
      }
    }
  }])

})(window.angular)
