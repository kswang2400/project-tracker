BasecampApp.Models.Task = Backbone.Model.extend({
  urlRoot: function () { 
    return "/api/projects/" + this.project.id + "/tasks";
  },

  initialize: function (options) {
    this.project = options.project
  }
});