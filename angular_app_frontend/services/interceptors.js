/**
 * Created by Nem on 1/13/16.
 */



app.config(function ($httpProvider, $provide) {
    
    
    $provide.factory('s3FeedbackInterceptor', function ($q) {

        return {
            'request' : function (config) {
                var x = config
                return config
            },

            'response' : function (response) {



                return response
            }
        }
        
    })

    $httpProvider.interceptors.push('s3FeedbackInterceptor');
})
