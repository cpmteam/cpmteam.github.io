angular.module('app').factory('DataSrvc', ['$http', '$q', '$location', function ($http, $q, $location) {
    $location.hasUrlArgument = function (name) {
      var object = $location.search();
      return object.hasOwnProperty(name) && !!object[name];
    }

    return {
      getPromise: function (config) {
        var deferred = $q.defer();

        $http(config)
          .then(function (data, status, headers, config) {
            deferred.resolve(data.data);
          })
          .catch(function (data, status, headers, config) {
            deferred.reject(data, status, headers, config);
          });

        return deferred.promise;
      },
      getData: function (cb) {
        var url = 'https://cpmisc.smileupps.com/-/all';
        if ($location.hasUrlArgument('local')) {
          url = 'test/repo.json';
          console.log('local JSON');
        } else if ($location.host().indexOf('127.0.0.1.xip.io') !== -1) {
          url = $location.protocol() + '://registry.127.0.0.1.xip.io/-/all';
        } else {
          console.log('remote JSON');
        }
        $http.get(url, { cache: true })
          .then(function (data) {
            console.log('SUCCESS')
            cb(data.data);
          })
          .catch(function (data) {
            console.log('ERROR');
          })

      },
    }
  }]);
