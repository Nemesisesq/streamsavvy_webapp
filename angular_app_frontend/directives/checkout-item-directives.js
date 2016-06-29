/**
 * Created by Nem on 6/4/16.
 */
serviceInformation = {
    ppv: {
        name: 'Pay Per View',
        price: 0.00,
        description: 'If a subscription service is not for you, these apps allow you to purchase a show at a time.' +
        ' Or you can purchase an entire season once it has finished airing.',
        subscriptionLink: 'https://play.google.com/store/movies/category/TV?hl=en',
        gPlayLink: '',
        iOSAppStoreLink: ''
    },
    netflix: {
        name: 'netflix', price: 9.99, description: 'Best described as a "binge watch" service. ' +
        'Typically, full seasons are launched all at once and a season behind what is currently showing on TV. Netflix also offers original programming now.' +
        ' This is also released a full season at a time.',
        subscriptionLink: 'https://www.netflix.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.netflix.mediaclient&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/netflix/id363590051?mt=8&utm_source=Lifehacker+Newsletter&utm_campaign=84a4c2a72c-UA-142218-1&utm_medium=email'
    },
    hulu_plus: {
        name: 'hulu_plus',
        price: 7.99,
        description: 'An on-demand service (think DVR) that offers shows from certain networks (ABC, limited NBC, FOX, CW, etc)' +
        ' a day after they air. Subscription prices depend on whether or not you purchase an ad-free package or not.',
        subscriptionLink: 'http://www.hulu.com/start',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.hulu.livingroomplus',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/hulu/id376510438?mt=8'
    }
    ,
    amazon_prime: {
        name: 'amazon_prime',
        price: 8.25,
        description: 'An on-demand and binge combo. Some programming is offered in full-season format and some is on-demand after it airs live.' +
        ' Some shows are free while others are not. Amazon is also building a strong offering of original shows. ' +
        'It comes free with an annual Prime membership.',
        subscriptionLink: 'http://www.amazon.com/gp/video/getstarted',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.amazon.mShop.android.shopping',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/amazon-video/id545519333?mt=8&ign-mpt=uo%3D2'
    }
    ,
    hbo_now: {
        name: 'hbo_now',
        price: 14.99,
        description: 'Watch HBO shows the moment they air, on-demand, or binge. They also offer all back seasons of episodes.',
        subscriptionLink: 'https://order.hbonow.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.hbo.hbonow&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/hbo-now/id971265422?mt=8&ign-mpt=uo%3D2'
    }
    ,
    'sling-tv': {
        name: 'sling-tv', price: 20.00,
        description: 'Live streaming service that makes shows available as they simultaneously air on cable.' +
        ' The main Sling package gives you a "skinny bundle" of some of the most popular cable channels (ESPN, CNN, HGTV, etc.) ' +
        'with the option to add extra mini packages on top of your main Sling package.',
        subscriptionLink: 'https://www.sling.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.sling',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/sling-tv-live-and-on-demand/id945077360?mt=8'
    }
    ,
    ota: {
        name: 'Over The Air',
        price: 0.00,
        description: 'Watching over the air (OTA) is like watching live television.' +
        ' There is no monthly cost, but a digital antenna is needed to pull in the signal.',
        subscriptionLink: 'http://amzn.com/B00X4RA74A',
        gPlayLink: '',
        iOSAppStoreLink: ''
    }
    ,
    showtime: {
        name: 'showtime',
        price: 10.99,
        description: 'Watch Showtime shows the moment they air, on-demand, or binge. They also offer all back seasons of episodes.',
        subscriptionLink: 'http://www.sho.com/order?source=acq_shoanytime_about',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.showtime.showtimeanytime',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/showtime-anytime/id484232467?mt=8'
    }
    ,
    cbs: {
        name: 'cbs',
        price: 5.99,
        description: 'New CBS episodes on demand the day after they air and almost all past seasons of CBS shows for binging.' +
        ' In select markets, you can stream CBS live.',
        subscriptionLink: 'https://www.cbs.com/all-access/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.cbs.ott',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/cbs/id530168168?mt=8'
    }
    ,
    nbc: {
        name: 'nbc',
        price: 0.00,
        description: 'A DVR-like, on-demand app that offers shows from NBC a day after they air. You do have to watch commercials, but it\'s free.',
        subscriptionLink: 'http://www.nbc.com/video',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.nbcuni.nbc&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/nbc-watch-now-stream-full/id442839435?mt=8'
    }
    ,
    thecw: {
        name: 'thecw',
        price: 0.00,
        description: 'An on-demand and binge combo for classic CW shows and some new original content.',
        subscriptionLink: 'http://www.cwseed.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.cw.seed.android&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/the-cw/id491730359?mt=8'
    }
    ,
    pbs: {
        name: 'PBS App',
        price: 0.00,
        description: 'A streaming App for PBS.',
        subscriptionLink: 'http://www.pbs.org/video/',
        gPlayLink: '',
        iOSAppStoreLink: ''
    }
    ,
    starz: {
        name: 'starz',
        price: 8.99,
        description: 'Download and watch past episodes and seasons of your favorite Starz shows. Unlike HBO Now and Showtime,' +
        ' you can\'t watch shows as they air. They do let you download shows to watch at a later time when you may not have access to wifi.',
        subscriptionLink: 'https://www.starz.com/buy-starz/?TID=',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.bydeluxe.d3.android.program.starz&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/starz/id550221096?mt=8'
    }
    ,
    seeso: {
        name: 'Seeso',
        price: 3.99,
        description: 'NBC\'s binge watching app for classic and hard-to-find comedy as well as original content. No commercials.',
        subscriptionLink: 'https://www.seeso.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=seeso.com&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/seeso/id1053181816?mt=8'
    }
    ,
    tubi_tv: {
        name: 'tubi_tv', price: 0.00, description: 'Free binge watching app for unique and classic content.',
        subscriptionLink: 'https://tubitv.com/',
        gPlayLink: 'https://play.google.com/store/apps/details?id=com.tubitv&hl=en',
        iOSAppStoreLink: 'https://itunes.apple.com/us/app/tubi-tv-stream-free-movies/id886445756?mt=8   '
    }


}

app.directive('checkoutItem', function () {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/checkout-item-template.html',
        scope: {
            key: '=',
            value: '=',
            package: '='
        },

        link: function (scope, element) {
            scope.windowWidth = window.innerWidth;


        }
    }
})


app.directive('checkoutImageBlock', function ($http) {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/checkout-image-block.html',
        scope: {
            service: '=',
            key: '='
        },

        link: function (scope, element) {


            scope.processServiceUrl = function (service) {
                if (scope.key == 'ota') {
                    return 'ota_sprite'
                }


                return service + "_sprite"
            }

        }
    }
})

app.directive('actionBlock', function ($window) {

    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/action-block.html',
        scope: {
            service: '=',
            package: '='
        },

        link: function (scope, element) {


            scope.linkToAffiliate = function (service) {
                debugger;
                $window.open(service.service_description.subscription_link)
            }


            scope.isServiceAdded = function (service) {

                return _.some(scope.package.data.services, function (elem) {
                    return _.includes(elem.chan, service.chan.source)
                })
            }

            scope.addService = function (service) {


                scope.isServiceAdded(service) || scope.package.data.services.push(service)

            }

            scope.removeServiceFromPackage = function (service) {

                scope.package.data.services.pop(service)
            }

            // scope.

        }
    }

})


app.directive('alignRemoveButton', function (CheckoutFactory) {
    return {
        restrict: 'A',

        link: function (scope, element, attrs) {

            CheckoutFactory.getLongestShowLength()

        }
    }
})

app.factory('CheckoutFactory', function () {
    var _longestShowLength
    return {
        setLongestShowLength: function (length) {
            _longestShowLength = length;
        },

        getLongestShowLength: function () {
            return _longestShowLength;
        }
    }
})

app.directive('checkoutShows', function () {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-item-shows.html',
        scope: {
            show: '=',
        },

        link: function (scope, element) {

        }
    }
})

app.directive('checkoutService', function ($http, $window) {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/checkout-service-template.html',
        scope: {
            service: '=',
            key: '=',
            package: '='
        },
        link: function (scope, element, attrs) {

            $http.get('https://streamsavvy-data.herokuapp.com/service_description/' + scope.service.chan.source)
                .then(function (data) {
                    scope.service.service_description = data.data
                    console.log(data)

                })

            scope.windowWidth = window.innerWidth;
            scope.removeServiceFromPackage = function (service) {

                scope.package.data.services.pop(service)
            }

            scope.removeElementFromDom = function (service) {
                debugger;

                element.remove()
            }
        }
    }
})

app.directive('ppvCheckoutItem', function ($window) {
    return {
        restrict: 'E',
        templateUrl: 'static/partials/checkout-list/ppv-checkout-item.html',
        scope: {
            key: '=',
            value: '=',
            package: '='
        },
        link: function (scope, element, attrs) {

            scope.windowWidth = $window.innerWidth

            scope.removeElementFromDom = function (service) {
                
                element.remove()
            }

        }
    }
})




$(document).ready(function () {
    _.sortBy($('.checkout-show-title'), function () {

        return $(this).width
    })
})
