BasecampApp.Models.Upload = Backbone.Model.extend({
  urlRoot: function () { return "/api/projects/" + this.project.id + "/uploads" },

  initialize: function (options) {
    this.project = options.project;
  }
});