angular.module('app').controller('RepoCtrl', ['$scope', 'DataSrvc', '$routeParams', function ($scope, DataSrvc, $routeParams) {
  $scope.sourceData = [];
  $scope.readmeText = '';

  function getSiteUrl(uri) {
    return uri.split('/',3).join('/')
  }
  DataSrvc.getData(function (data) {
    var packageName = $routeParams.name;
    $scope.data = data.data[packageName];

    if (data.readmeText) {
        $scope.readmeText = $scope.data.readmeText;
    } else {
      var packageLatest = getSiteUrl(data.config.url) + '/' + packageName + '/latest';

      DataSrvc.getUrlData(packageLatest, function(data) {
        $scope.readmeText = data.data.readmeText;
        console.log($scope.readmeText);
      });
    }
  })

}]);
