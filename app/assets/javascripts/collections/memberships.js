BasecampApp.Collections.Memberships = Backbone.Collection.extend({
  model: BasecampApp.Models.Membership,
  url: function () { 
    return "/api/projects/" + this.project.id + "/memberships";
  },
  
  initialize: function (options) {
    this.project = options.project;
  }
})