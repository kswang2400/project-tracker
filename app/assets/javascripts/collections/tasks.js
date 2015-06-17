BasecampApp.Collections.Tasks = Backbone.Collection.extend({
  model: BasecampApp.Models.Task,
  url: "/api/tasks"
});