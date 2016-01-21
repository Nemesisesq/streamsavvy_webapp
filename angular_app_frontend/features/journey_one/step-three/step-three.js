app.controller('StepThreeController', function ($scope, PackageFactory) {

    $scope.package = PackageFactory.getPackage();
    $scope.hardwareTotal = PackageFactory.totalHardwareCost();
    $scope.servicesTotal = PackageFactory.totalServiceCost();
    //$scope.packageTotal = getPackageTotal();
    $scope.$addProviderUrls = function () {
        for (var i = 0; i < $scope.package.providers.length; i++) {
            var providerName = $scope.package.providers[i].display_name;
            switch (providerName) {
                case "Yahoo Screen Over the Air":
                    $scope.package.providers[i].home_url = "https://www.yahoo.com/tv/tagged/originals";
                    break;
                case "Netflix":
                    $scope.package.providers[i].home_url = "https://www.netflix.com/";
                    break;
                case "HBO NOW":
                    $scope.package.providers[i].home_url = "https://order.hbonow.com/";
                    break;
                case "Sling TV (ESPN)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (CNN)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (ABC Family)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Slin" +
                "g TV (AMC)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (TNT)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (TBS)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (The CW)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Sling TV (Travel)":
                    $scope.package.providers[i].home_url = "http://www.sling.com/";
                    break;
                case "Amazon Prime":
                    $scope.package.providers[i].home_url = "http://www.amazon.com/gp/prime/pipeline/prime_gifting_landing/?ref_=assoc_tag_ph_1415183446617&ie=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=strea03d-20&linkId=UBNDLZEPEGPD6JDJ";
                    break;
                case "Amazon":
                    $scope.package.providers[i].home_url = "http://www.amazon.com/gp/prime/pipeline/prime_gifting_landing/?ref_=assoc_tag_ph_1415183446617&ie=UTF8&camp=1789&creative=9325&linkCode=pf4&tag=strea03d-20&linkId=UBNDLZEPEGPD6JDJ";
                    break;
                case "Showtime":
                    $scope.package.providers[i].home_url = "http://www.sho.com/sho/showtime-anytime";
                    break;
                case "Showtime FREEview Over the Air":
                    $scope.package.providers[i].home_url = "http://www.sho.com/sho/free-preview/1";
                    break;
                case "Hulu":
                    $scope.package.providers[i].home_url = "http://www.hulu.com/welcome";
                    break;
                case "Hulu with Showtime":
                    $scope.package.providers[i].home_url = "http://www.hulu.com/getshowtime";
                    break;
                case "CBS All Access":
                    $scope.package.providers[i].home_url = "http://www.cbs.com/all-access/";
                    break;
                case "VUDU":
                    $scope.package.providers[i].home_url = "http://www.vudu.com/";
                    break;
                case "Google Play":
                    $scope.package.providers[i].home_url = "https://play.google.com/store/movies?hl=en";
                    break;
                case "iTunes":
                    $scope.package.providers[i].home_url = "https://www.apple.com/itunes/download/";
                    break;
                case "YouTube":
                    $scope.package.providers[i].home_url = "https://www.youtube.com/user/YouTubeShowsUS/featured";
                    break;
                case "NBC Over the Air":
                    $scope.package.providers[i].home_url = "http://www.nbc.com/schedule";
                    break;
                case "CBS Over the Air":
                    $scope.package.providers[i].home_url = "http://www.cbs.com/schedule/";
                    break;
                case "FOX Over the Air":
                    $scope.package.providers[i].home_url = "http://www.fox.com/schedule";
                    break;
                case "ABC Over the Air":
                    $scope.package.providers[i].home_url = "http://abc.go.com/schedule";
                    break;
                case "The CW Over the Air":
                    $scope.package.providers[i].home_url = "http://www.cwtv.com/schedule/";
                    break;
                default:
                    $scope.package.providers[i].home_url = "http://www.guidebox.com/";
                    break;
            }
        }
    };
    $scope.$watch(function () {
        return PackageFactory.getPackage()
    }, function () {
        $scope.package = PackageFactory.getPackage();
        $scope.$addProviderUrls();
    });


})
