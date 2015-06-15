BasecampApp.Models.Task = Backbone.Model.extend({
  initialize: function (options) {
    this.project = options.project;
  },
  urlRoot: function () {
    if (this.project === undefined) {
      setTimeout(function () {
        return "/api/projects/" + this.project.id + "/tasks";
      }, 0)
    } else {
      return "/api/projects/" + this.project.id + "/tasks";
    }
  },

});