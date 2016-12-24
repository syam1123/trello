(function (){

  angular.module('trelloApp')
    .controller('cardDetailCtrl', ['$scope', '$localStorage', '$state', '$mdBottomSheet', function($scope, $localStorage, $state, $mdBottomSheet){
      
      $scope.init = function(){
        $scope.selectedCard = $localStorage.editingCard
        $scope.allPendingCards = $localStorage.pendingCards
      }
      $scope.init()
      
      $scope.editName = function(){
        $scope.isNameEditing = true
      }
      
      $scope.editDetails = function(){
        $scope.isDetailEditing = true
      }
      
      $scope.saveDetails = function(){
        $scope.isDetailEditing = false
        $scope.isNameEditing = false
        for(key in $scope.allPendingCards){
          if($scope.allPendingCards[key].id  == $scope.selectedCard.id){
            $scope.allPendingCards[key] = $scope.selectedCard
            $localStorage.pendingCards = $scope.allPendingCards
          }
        }
      }
    }])
})();