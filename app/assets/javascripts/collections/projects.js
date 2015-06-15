BasecampApp.Collections.Projects = Backbone.Collection.extend({
  model: BasecampApp.Models.Project,
  url: "/api/projects"
});