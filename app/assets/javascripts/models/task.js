BasecampApp.Models.Task = Backbone.Model.extend({
  urlRoot: function () {
    if (this.project === undefined) {
      setTimeout(function () {
        return "/api/projects/" + this.project.id + "/tasks"; 
      }, 0)
    } else {
      return "/api/projects/" + this.project.id + "/tasks";
    }
  },

  initialize: function (options) {
    this.project = options.project;
  }
});