
angular.module("app", ["ngRoute", "ui.bootstrap"]);

angular.module('app')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/presentation.html',
                controller: 'MyCtrl'
            })
            .when('/page-de-test', {
                templateUrl: 'partials/pageDeTest.html',
                controller: 'MyCtrl'
            });
    });

angular.module("app")
    .controller("AppCtrl", function($scope) {

    // PRIVATE
    var _currentPage = 1;

    function previous() {
        if (_currentPage > 1) {
            _currentPage--;
        }
        $scope.currentPage = _currentPage;
    }

    function next() {
        if (_currentPage < 9) {
            _currentPage++;
        }
        $scope.currentPage = _currentPage;
    }

    // SCOPE
    $scope.currentPage = _currentPage;

    $scope.keyDown = function($event) {

        console.log($event.keyCode);

        // Right
        if ($event.keyCode == 39) {
            $event.preventDefault();
            next();
        }
        // Left
        else if ($event.keyCode == 37) {
            $event.preventDefault();
            previous();
        }
    }

    $scope.previous = function() {
        previous();
    }

    $scope.next = function() {
        next();
    }
});

angular.module("app")
    .controller("MyCtrl", function($scope, heroService) {

    $scope.name = "Batman";

    $scope.hello = function () {
        alert("Salut " + $scope.name);
    }

    //

    $scope.heroes = heroService.heroes();

    $scope.addHero = function (hero) {
        heroService.add(hero);
    }
});

angular.module("app")
    .factory("heroService", function($rootScope) {

    var heroes = new Array("Batman", "Superman");

    return {

        add : function(hero) {
            heroes.push(hero);
        },

        heroes : function() {
            return heroes;
        }
    }
});

angular.module("app")
    .directive('superhero', function () {
        return {
            restrict: 'EAC',
            template:"<button class='btn btn-block btn-primary'></button>",
            replace:"true",
            link: function(scope, element, attr) {
                element.text("Je suis " + attr.skill);
            }
        };
    });


