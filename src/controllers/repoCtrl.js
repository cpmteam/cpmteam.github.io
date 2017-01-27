angular.module('app').controller('RepoCtrl', ['$scope', 'DataSrvc', '$routeParams', function ($scope, DataSrvc, $routeParams) {
  $scope.sourceData = [];
  $scope.readmeText = '';

  DataSrvc.getData(function (data) {
    var packageName = $routeParams.name;
    $scope.data = data[packageName];

    DataSrvc.getUrlData('https://cpmisc.smileupps.com/' + packageName + '/latest', function(data) {
      $scope.readmeText = data.readmeText;
      console.log($scope.readmeText);
    });
  })

}]);
