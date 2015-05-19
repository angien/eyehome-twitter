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

    $scope.favorite = function() {

      console.log("calling favorite");
       window.setTimeout(function() {
        console.log("timeout");
        //$.Event("keydown", {keyCode: 16});


        $.get("/keypress");


//         var press = jQuery.Event("keypress");
// press.keyCode = 13;
// press.which = 13;
// $('#screen1').keypress(function(){alert("hello");}).trigger(press);

        }, 1000); 

      
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

// have yet to check which page we're on (only works on first page)
// may also want to refactor this out into its own controller
  $scope.keyPress = function(e, currentScreen) {
    console.log('keyup', e);
    var key = e.keyCode ? e.keyCode : e.which;

    if (currentScreen == 1) {
       if (key == 37) //left
        $scope.previous();
      else if (key == 38) //up
          $scope.createTweet();
      else if (key == 39) // right
          $scope.next();
      else if (key == 40) // down
          $scope.toScreen2();
      else
          console.log(e.keyCode);
    }
    else { // is 2

      //TODO fix this because we don't want any pop ups (fix in index)
       if (key == 37) //left
        $scope.previous();
    else if (key == 38) //up
        $scope.createTweet();
    else if (key == 39) // right
        $scope.next();
    else if (key == 40) // down
        $scope.toScreen2();
    else
        console.log(e.keyCode);
    }
   

    console.log("current screen is " + currentScreen);
  }
	

    init();
});