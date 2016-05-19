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
        150,//150
        26,
        157,
        171,  //DirecTV
        169, //Dish
        234, 70, //Food Network
        // 36, //HBO
        12, 54, //USA
        32, //FX
        170, //AT&T U-verse
        // 281, //Hulu with Showtime
        69, //Cinemax
        // 141, ///Showtime Freeview
        67, //TV Guide
        // 1, //Hulu_Free
        235, 16, //Watch HGTV
        22, 237, 240, //MTV
        31, //Bravo
        // 17, //A&E
        20, 101, //Syfy
        10, 48, 59, //Comedy Central
        133, //Starz
        21, 241, 239, //VH1
        // 18, 123, //History Channel
        121, 190, //Esquire, Esquire Network
        // 14, 267 //Showtime

    ];
    return function (input) {
        var list = _.filter(input, function (elem) {
            var res = _.some(unwantedChannelIDs, function (x) {
                if (elem !== undefined) {
                    if (elem.chan.id !== undefined) {
                        return x === elem.chan.id;
                    } else {
                        return x === elem.chan.guidebox_data.id
                    }
                }
            })
            return !res
        })
        return list
    }
})

app.filter('onSling', function (Fuse, SLING_CHANNELS) {
    return function (input, bool) {
        return _.filter(input, function (elem) {

            var sling_fuse = new Fuse(SLING_CHANNELS, {threshold: .1});

            if (elem.diplay_name != undefined && sling_fuse.search(elem.display_name)) {
                return true == bool
            }
            if (elem.name != undefined && !_.isEmpty(sling_fuse.search(elem.name))) {
                return true == bool
            }

            if (elem.is_on_sling) {

                return true == bool
            }

            if (elem.guidebox_data) {
                if (elem.guidebox_data.on_sling) {
                    return true == bool
                }
            }

            if (elem.name == 'Netflix') {
                return false
            }

            return false == bool

        })
    }
})

    .filter('onNetflix', function (_) {
        // debugger;
        return function (array) {
            return _.filter(array, 'on_netflix')
        }

    })