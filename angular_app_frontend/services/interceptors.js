/**
 * Created by Nem on 1/13/16.
 */


//angular.module('streamsavvy')

app.factory('s3FeedbackInterceptor', function ($q) {

    return {
        'request': function (config) {
            var x = config;
            return config
        },

        'response': function (response) {


            return response
        }
    }

})

    .factory('LogoutInterceptor', function ($window) {
        return {
            response: function (config) {
                //

                return config
            }
        }
    })

    .factory('LoginInterceptor', function () {
        return {
            request: function(config) {
                debugger;

                con
            }
        }

    })

    .factory('TokenAuthInterceptor', function ($window, $q) {
        return {
            request: function (config) {



                config.headers = config.headers || {}
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'JWT ' + $window.sessionStorage.token;
                }
                return config
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                }
                if (response.headers().token) {
                    $window.sessionStorage.token = response.headers().token
                }

                if (response.data != undefined && response.data.hasOwnProperty('token')) {
                    $window.sessionStorage.token = response.data.token
                }
                return response || $q.when(response);
            }
        }
    })

    .config(function ($httpProvider, $provide, $windowProvider) {
        $httpProvider.interceptors.push('s3FeedbackInterceptor');
        $httpProvider.interceptors.push('LogoutInterceptor');
        $httpProvider.interceptors.push('TokenAuthInterceptor')
        // $httpProvider.interceptors.push('LoginInterceptor')

    })
