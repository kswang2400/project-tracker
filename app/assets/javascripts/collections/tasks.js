BasecampApp.Collections.Tasks = Backbone.Collection.extend({
  model: BasecampApp.Models.Task,
  url: function () { 
    return "/api/projects/" + this.project.id + "/tasks";
  },
  
  initialize: function (options) {
    this.project = options.project;
  }
});