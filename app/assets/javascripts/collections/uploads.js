BasecampApp.Collections.Uploads = Backbone.Collection.extend({
  model: BasecampApp.Models.Upload,
  url: function () { 
    return "/api/projects/" + this.project.id + "/uploads";
  },

  initialize: function (options) {
    this.project = options.project;
  }
});