/**
 * Created by Nem on 11/17/15.
 */

function isLive(elem) {
    if (elem.source != 'hulu_free') {
        return _.includes(elem.type, 'tv') || _.includes(elem.type, 'tele') || elem.type === 'free' || _.includes(elem.display_name.toLowerCase(), 'now');
    }


}

function isOnDemand(elem) {

    if (elem.source == 'netflix') {
        return false
    }

    if (elem.source == 'hulu_free') {
        return false
    }

    return _.includes(elem.type, 'sub')
}

app.filter('channel', function () {
    return function (input, type) {


        var list = _.filter(input, function (elem) {
            if (type == 'live') {
                return isLive(elem);
            }
            if (type == 'onDemand') {
                return isOnDemand(elem)
            }
            if (type == 'fullseason') {
                return _.includes(elem.type, 'sub')
            }
            if (type == 'alacarte') {
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
        console.log(list)
        console.log('list')

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

app.filter('unwantedChannels', function () {
    var unwantedChannelIDs = [
    150,
    26,
    157,
    171,  //DirecTV
    169, //Dish
    36, //HBO
    12, 54, //USA
    32, //FX
    170, //AT&T U-verse
    281, //Hulu with Showtime
    69, //Cinemax
    141, //Showtime Freeview
    67, //TV Guide
    1, //Hulu_Free
    235, //Watch HGTV
    22, //MTV
    31, //Bravo
    17, //A&E
    20, 101, //Syfy
    133, //Starz
    14,267 //Showtime

    ];
    return function (input) {
        var list = _.filter(input, function (elem) {
            var res = _.some(unwantedChannelIDs, function (x) {
                if(elem.chan.id)
                {
                    return x == elem.chan.id
                }
                return x == elem.chan.guidebox_data.id
            })

            return !res

        })


        return list
    }
})