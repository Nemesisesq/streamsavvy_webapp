/**
 * Created by Nem on 7/26/16.
 */
app.filter('unique', function () {
    return function (collection, keyname) {
        var output = [],
            keys = [];

        angular.forEach(collection, function (item) {
            var key = item[keyname];
            if (keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(item);
            }
        });

        return output;
    };
});

app.filter('unchosen', function () {
    return function (collection, scope) {
        var res = _.filter(collection, function (item) {
            return !_.some(scope.package.data.content, ['title', item.title])
        })

        return res
    }
})


app.filter('liveFilter', function(){
    return function (collection, bool) {

        var res = _.filter(collection, function(item){
            return item.model.hasOwnProperty('category') == bool
        })

        return res

    }
})