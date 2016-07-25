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

    .factory('IdTokenInterceptor', function () {
        return {
            request: function(config) {
                if(window.sessionStorage.anon_user && config.method == 'GET' && config.url == '/api/package/'){
                    config.url = config.url + '?anon_user=' + window.sessionStorage.anon_user


                }

                return config
            },

            response: function(response) {
                // debugger

                if(response.config.url == "/api/users" && response.data.results[0].email == ""){
                    if(!window.sessionStorage.anon_user){
                        window.sessionStorage.anon_user = response.data.results[0].username
                    }
                // debugger
                }

                return response


            }
        }

    })

    .factory('TokenAuthInterceptor', function ($window, $q) {
        return {
            request: function (config) {



                config.headers = config.headers || {}
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = $window.sessionStorage.token;
                }
                return config
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                }
                if (response.data.token) {
                    $window.sessionStorage.token = response.data.token
                }

                if (response.data != undefined && response.data.hasOwnProperty('token')) {
                    $window.sessionStorage.token = response.data.token
                }
                return response || $q.when(response);
            }
        }
    })

    .config(['$httpProvider', '$provide', '$windowProvider' ,function ($httpProvider, $provide, $windowProvider) {
        $httpProvider.interceptors.push('s3FeedbackInterceptor');
        $httpProvider.interceptors.push('LogoutInterceptor');
        $httpProvider.interceptors.push('TokenAuthInterceptor')
        $httpProvider.interceptors.push('IdTokenInterceptor')

    }])
