window.BasecampApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new BasecampApp.Routers.Router({ 
      $rootEl: $('#main')
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  BasecampApp.initialize();
});
