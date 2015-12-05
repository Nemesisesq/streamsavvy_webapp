/**
 * Created by Nem on 11/17/15.
 */

app.filter('channel', function () {
    return function (input, type) {


        var list = _.filter(input, function (elem) {
            debugger
            if(type == 'live'){
                return _.includes(elem.type, 'tv') || _.includes(elem.type, 'tele')
            }
            if(type == 'onDemand'){
                debugger
                return _.includes(elem.type, 'sub')
            }
            if(type == 'fullseason'){
                debugger
                return _.includes(elem.type, 'sub')
            }
            if(type == 'alacarte'){
                debugger
                return _.includes(elem.type, 'purchase')
            }
        })

        return list
    }
})

app.filter('onDemand', function () {
    return function (input) {

        var list = _.filter(input, function (elem) {
            return elem.name != 'Netflix';
        })

        return list
    }

});

app.filter('fullSeason', function () {

    return function (input) {


        var list = _.filter(input, function (elem) {
            return elem.name == 'Netflix';
        })

        return list
    }

});