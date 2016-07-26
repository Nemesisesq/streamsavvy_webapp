/**
 * Created by Nem on 7/25/16.
 */
app.controller('ModuleController', function ($scope, $http) {
    $scope.snt = [
        {
            title: "Sports",
            is_category: true,
            img_url: "https://s3.amazonaws.com/streamsavvy/sports.png"
        }, {
            title: "News",
            is_category: true,
            img_url: "https://s3.amazonaws.com/streamsavvy/news.png"
        }, {
            title: "Live",
            is_category: true,
            img_url: "https://s3.amazonaws.com/streamsavvy/livetv.png"
        }
    ]
})
