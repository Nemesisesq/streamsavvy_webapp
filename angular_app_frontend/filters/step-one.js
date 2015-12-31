/**
 * Created by Nem on 11/17/15.
 */

function isLive(elem){
    if (elem.source != 'hulu_free') {
        return _.includes(elem.type, 'tv') || _.includes(elem.type, 'tele' ) || elem.type === 'free' || _.includes(elem.display_name.toLowerCase(), 'now');
    }


}

function isOnDemand(elem) {

    if(elem.source == 'netflix'){
        return false
    }

    if(elem.source == 'hulu_free'){
        return false
    }

    return  _.includes(elem.type, 'sub')
}

app.filter('channel', function () {
    return function (input, type) {


        var list = _.filter(input, function (elem) {
            if(type == 'live'){
                return isLive(elem);
            }
            if(type == 'onDemand'){
                return isOnDemand(elem)
            }
            if(type == 'fullseason'){
                return _.includes(elem.type, 'sub')
            }
            if(type == 'alacarte'){
                //debugger
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