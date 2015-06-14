BasecampApp.Models.Membership = Backbone.Model.extend({
  urlRoot: function () { 
    return "/api/projects/" + this.project.id + "/memberships"
  },

  initialize: function () {
    
  }
});