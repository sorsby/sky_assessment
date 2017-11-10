'use strict';

angular.module('moodsliderApp')
  .controller('HomeCtrl', ['$http', '$scope', 'programmeService', 'moodService', 'recommendationService',
    function ($http, $scope, programmeService, moodService, recommendationService) {

      var defaultMoodsFile = "../data/default_moods.json";

      $scope.moods = {};
      $scope.moodMin = -5;
      $scope.moodMax = 5;

      var programmes = {};

      var updateRecommendedProgrammes = function (moodData, programmeData) {
        $scope.recommendedProgrammes = recommendationService.getProgrammeRecommendations(moodData, programmeData);
      };

      /**
       * Setup the moodsliders with their default config.
       */
      moodService.setupMoodSliders(function (moodData) {
        $scope.moods = moodData;
        // updateRecommendedProgrammes($scope.moods, programmes)
      });

      /**
       * Setup the programme recommendations.
       * First callback handles uploaded data being returned.
       * Second callback defaults to placeholder data.
       */
      programmeService.getProgrammes(function (programmeData) {
        programmes = programmeData;
        updateRecommendedProgrammes($scope.moods, programmes);
      }, function (defaultProgrammeData) {
        programmes = defaultProgrammeData;
        updateRecommendedProgrammes($scope.moods, programmes);
      });

      /**
       * Callback function for slider onstop event.
       * @param {*}  
       * @param {*} value 
       */
      $scope.sliderCallback = function ($event, value) {
        var moodData = $scope.moods;
        updateRecommendedProgrammes(moodData, programmes);
      };
    }
  ]);