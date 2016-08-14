describe('ng-text-length', ()=> {

  let app = null
    , $compile = null
    , $rootScope = null
    , $scope = null

  beforeEach(module('ngTextLength'))

  beforeEach( ()=> {
    inject( (_$compile_, _$rootScope_)=> {
      $compile = _$compile_
      $rootScope = _$rootScope_
      $scope = _$rootScope_.$new()
    })
  })

  let compile = (html)=> {
    let element = $compile(html)($scope)
    $scope.$digest()
    return element
  }

  let fieldTemplate = (min, max, value = '')=> {
    let minLength = min === null ? '' : `min-text-length="${min}"`
    let maxLength = max === null ? '' : `max-text-length="${max}"`
    $scope.fieldValue = value

    return `
      <form name="testForm">
        <input name='field' ${minLength} ${maxLength} ng-model="fieldValue" />
      </form>` 
  }

  describe('module', ()=> {
    beforeEach( ()=> app = angular.module('ngTextLength') )

    it('is defined', ()=> expect(app).to.exist )
    it('does not have any dependency', ()=> expect(app.value('appName').requires).to.be.empty )
  })

  describe('minTextLength', ()=> {

    it('treats "undefined" values as empty', ()=> {
      compile(fieldTemplate(0, null, undefined))
      expect($scope.testForm.field.$valid).to.be.true
      compile(fieldTemplate(1, null, undefined))
      expect($scope.testForm.field.$valid).to.be.false
    })

    it('treats "null" values as empty', ()=> {
      compile(fieldTemplate(0, null, null))
      expect($scope.testForm.field.$valid).to.be.true
      compile(fieldTemplate(1, null, null))
      expect($scope.testForm.field.$valid).to.be.false
    })

    it('is valid when the text of a textual ngModel is longer or equal than the minimum', ()=> {
      compile(fieldTemplate(3, null))
      expect($scope.testForm.field.$valid).to.be.false

      compile(fieldTemplate(3, null, 'a'))
      expect($scope.testForm.field.$valid).to.be.false

      compile(fieldTemplate(3, null, 'aaa'))
      expect($scope.testForm.field.$valid).to.be.true

      compile(fieldTemplate(3, null, 'aaaa'))
      expect($scope.testForm.field.$valid).to.be.true
    })

    it('is valid when the text of an HTML ngModel is longer or equal than the minimum', ()=> {
      compile(fieldTemplate(3, null, '<a></a>'))
      expect($scope.testForm.field.$valid).to.be.false

      compile(fieldTemplate(3, null, '<a>a</a>'))
      expect($scope.testForm.field.$valid).to.be.false

      compile(fieldTemplate(3, null, '<a>aaa</a>'))
      expect($scope.testForm.field.$valid).to.be.true

      compile(fieldTemplate(3, null, '<a>aaaa</a>'))
      expect($scope.testForm.field.$valid).to.be.true
    })
  })

})
