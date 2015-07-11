BasecampApp.Collections.Uploads = Backbone.Collection.extend({
  model: BasecampApp.Models.Upload,
  url: "api/uploads"
});