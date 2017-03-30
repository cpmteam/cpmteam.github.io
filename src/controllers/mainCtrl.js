angular.module('app').controller('MainCtrl', ['$scope', '$http', 'DataSrvc', '$location', function($scope, $http, DataSrvc, $location) {
    $scope.data = [];
    $scope.sourceData = [];
    $scope.numLimit = 3;


    function getPurePackageName(packageName) {
        var items = packageName.split('~');
        var head = items.shift();
        return head + '/' + items.join('~');
    }

    function getShortPackageName(packageName) {
        var items = packageName.split('~');
        var head = items.shift();
        return items.join('~');
    }

    DataSrvc.getData(function(data) {
        var localData = data.data;
        for (let item in localData) {
            if (item != '_updated') {
                localData[item].latest = localData[item]['dist-tags'].latest
                localData[item].nname = getPurePackageName(item);
                localData[item].sname = getShortPackageName(item);
                $scope.sourceData.push(localData[item]);
            }
        }
        $scope.data = $scope.sourceData
    })

    $scope.locate = function(path) {
        $location.path(path)
    };

    $scope.enter = function(term) {
        if (!term) {
            $scope.data = $scope.sourceData
            return;
        }

        $scope.data = [];
        $scope.sourceData.forEach(function(item) {
            if (item.name.indexOf(term) >= 0)
                $scope.data.push(item);
        })
    };
}]);