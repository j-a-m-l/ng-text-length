describe('ng-text-length', ()=> {

  let app = null
    , $compile = null
    , $rootScope = null
    , $scope = null

  beforeEach( ()=> {
    app = angular.module('ngTextLength')

    inject( (_$compile_, _$rootScope_)=> {
      $compile = _$compile_
      $rootScope = _$rootScope_
      $scope = _$rootScope_.$new()
    })
  })

  let compile = (html, scope)=> {
    let element = $compile(html)(scope)
    scope.$digest()
    return element
  }

  describe('module', ()=> {
    it('is defined', ()=> expect(app).to.exist )
    it('does not have any dependency', ()=> expect(app.value('appName').requires).to.be.empty )
  })

})
