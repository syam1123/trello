(function (){

  angular.module('trelloApp')
    .controller('homeCtrl', ['$scope', '$localStorage', '$state', '$mdBottomSheet', function($scope, $localStorage, $state, $mdBottomSheet){
    
    var home = this
    
    home.init = function(){
      home.pendingCards = $localStorage.pendingCards? $localStorage.pendingCards : []
      home.doneCards = $localStorage.doneCards? $localStorage.doneCards : []
      console.log("init caled");
    }
    
    home.init()
    
    home.addNewCard = function(name, details){
      if(!name){
        return
      }
      var newCard = {}
      newCard.name = name
      newCard.details = details? details : ''
      newCard.id = home.pendingCards.length + 1
      home.pendingCards.push(newCard)
      $localStorage.pendingCards = home.pendingCards
      home.addMoreOn = false;
      home.cardName = ''
    }
    
    home.moveCard = function(newCard, $event){
      $event.stopPropagation();
      home.pendingCards.splice(home.pendingCards.indexOf(newCard), 1)
      $localStorage.pendingCards = home.pendingCards
      home.doneCards.push(newCard)
      $localStorage.doneCards = home.doneCards
    }
    
    home.addDescription = function(card, description){
      home.pendingCards(indexOf(card)).details = description
      $localStorage.pendingCards = home.pendingCards
    }
    
    home.deleteCard = function(status, card){
      if(status == 'pending'){
        home.pendingCards.splice(indexOf(card), 1)
        $localStorage.pendingCards = home.pendingCards
      }
      else{
        home.doneCards.splice(indexOf(card), 1)
        $localStorage.doneCards = home.doneCards
      }
    }
    
    home.showAddMore = function(){
      home.addMoreOn = true;
      for(var task in home.pendingCards){
        delete home.pendingCards[task].isNameEditing
      }
    }
    
    home.editCard = function(card){
      home.isEditing = true
      $localStorage.editingCard = card
      console.log("clicked on edit card", card);
      $mdBottomSheet.show({
        templateUrl: 'views/cardDetails.tmpl.html',
        controller: 'cardDetailCtrl',
        onRemove: function(element){
          console.log("removed");
          var scrollmask = document.getElementsByClassName('md-scroll-mask');
          var backdrop = document.getElementsByTagName('md-backdrop');
          var bottomsheet = document.getElementsByTagName('md-bottom-sheet');
          angular.element(scrollmask).remove();
          angular.element(backdrop).remove();
          angular.element(bottomsheet).remove();
          angular.element(element).remove();
          home.init()
        }
      }).then(function(){
        
      })
    }
    
    home.editCardName = function(card, $event){
      $event.stopPropagation();
      for(var task in home.pendingCards){
        delete home.pendingCards[task].isNameEditing
      }
      card.isNameEditing = true
      home.addMoreOn = false
      home.cardName = card.name
    }
    
    home.changeName = function(newName, card){
      if(!newName){
        return
      }
      home.pendingCards[home.pendingCards.indexOf(card)].name = newName
      card.isNameEditing = false
      delete home.pendingCards[home.pendingCards.indexOf(card)].isNameEditing
      $localStorage.pendingCards = home.pendingCards
      home.cardName = ''
    }
    
  }]);
})();