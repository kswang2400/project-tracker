BasecampApp.Collections.AssignedTasks = Backbone.Collection.extend({
  model: BasecampApp.Models.AssignedTask,
  url: "/api/assigned_tasks"
})