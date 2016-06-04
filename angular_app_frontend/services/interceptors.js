/**
 * Created by Nem on 1/13/16.
 */


//angular.module('streamsavvy')

  app.factory('s3FeedbackInterceptor', function ($q) {

      return {
        'request': function (config) {
          var x = config
          return config
        },

        'response': function (response) {


          return response
        }
      }

    })

  .factory('TokenAuthInterceptor', function ($window, $q) {
      return {
        'request': function (config) {
          config.headers = config.headers || {}
          if ($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
          }

          return config
        },
        response: function (response) {
          if (response.status === 401) {
            // handle the case where the user is not authenticated
          }
          return response || $q.when(response);
        }
      }
    })

  .config(function ($httpProvider, $provide, $windowProvider) {
    $httpProvider.interceptors.push('s3FeedbackInterceptor');
    $httpProvider.interceptors.push('TokenAuthInterceptor')

  })
