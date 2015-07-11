BasecampApp.Collections.Tagged = Backbone.Collection.extend({
  model: BasecampApp.Models.Project,
  url: "/api/projects"
});