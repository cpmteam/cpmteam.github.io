angular.module('app').controller('RepoCtrl', ['$scope', 'DataSrvc', '$routeParams', function($scope, DataSrvc, $routeParams) {
    $scope.sourceData = [];
    $scope.readmeText = '';

    function getPurePackageName(packageName) {
        var items = packageName.split('~');
        var head = items.shift();
        return head + '/' + items.join('~');
    }

    function getSiteUrl(uri) {
        return uri.split('/', 3).join('/')
    }
    DataSrvc.getData(function(data) {
        var packageName = $routeParams.name;
        var pureName = getPurePackageName(packageName);
        $scope.data = data.data[packageName];
        $scope.data.nname = pureName;

        if (data.readmeText) {
            $scope.readmeText = $scope.data.readmeText;
        } else {
            var packageLatest = getSiteUrl(data.config.url) + '/' + packageName + '/latest';

            DataSrvc.getUrlData(packageLatest, function(data) {
                $scope.readmeText = data.data.readmeText;
                // console.log($scope.readmeText);
            });
        }
    })

}]);