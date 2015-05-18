var app = angular.module('Twitter', ['ngResource', 'ngSanitize']);

app.controller('TweetList', function($scope, $resource, $timeout) {

    /**
     * init controller and set defaults
     */
    function init () {

      // set a default username value
      $scope.username = "brilliant_bob";
      
      // empty tweet model
      $scope.tweetsResult = [];

      // initiate masonry.js
      /*$scope.msnry = new Masonry('#tweet-list', {
        columnWidth: 320,
        itemSelector: '.tweet-item',
        transitionDuration: 0,
        isFitWidth: true
      });

      // layout masonry.js on widgets.js loaded event
      twttr.events.bind('loaded', function () {
        $scope.msnry.reloadItems();
        $scope.msnry.layout();
      });*/

      $scope.getTweets();
    }

    /**
     * requests and processes tweet data
     */
    function getTweets (paging) {

      var params = {
        action: 'user_timeline',
        user: $scope.username
      };

      if ($scope.maxId) {
        params.max_id = $scope.maxId;
      }

      // create Tweet data resource
      $scope.tweets = $resource('/tweets/:action/:user', params);

      // GET request using the resource
      $scope.tweets.query( { }, function (res) {

        if( angular.isUndefined(paging) ) {
          $scope.tweetsResult = [];
        }

        $scope.tweetsResult = $scope.tweetsResult.concat(res);

        // for paging - https://dev.twitter.com/docs/working-with-timelines
        $scope.maxId = res[res.length - 1].id;
        $scope.tweetID = $scope.tweetsResult[0].id_str;

        // render tweets with widgets.js
        $timeout(function () {
          twttr.widgets.load();
        }, 10);
      });
    }

    /**
     * binded to @user input form
     */
    $scope.getTweets = function () {
      $scope.maxId = undefined;
      getTweets();
    }

    /**
     * binded to 'Get More Tweets' button
     */
    $scope.getMoreTweets = function () {
      getTweets(true);
    }
    
    /*indexing tweets*/
    $scope.tweet_index = 0;
    $scope.next = function() {
        if ($scope.tweet_index >= $scope.tweetsResult.length -1) {
            $scope.tweet_index = 0;
        }
        else {
            $scope.tweet_index++;
        }
        $scope.tweetID = $scope.tweetsResult[$scope.tweet_index].id_str;

    console.log("next was clicked");
    };
    
    $scope.previous = function() {
        if ($scope.tweet_index > 0) {
            $scope.tweet_index--;
        }
        $scope.tweetID = $scope.tweetsResult[$scope.tweet_index].id_str;
  };

    $scope.currentScreen = 1;
    $scope.toScreen2 = function () {
        $scope.currentScreen = 2;
    };
    $scope.toScreen1 = function () {
        $scope.currentScreen = 1;
    };
    $scope.createTweet = function(){
        //open keyboard
        //continuously read in twitter.txt
        $scope.tweets.post('statuses/update', { status: 'hello world!' }, function(err, data, response) {
            console.log(data);
        });
        
    };

  $scope.keyPress = function(keyEvent) {
    console.log('keyup', keyEvent);
  }
    

    init();
});