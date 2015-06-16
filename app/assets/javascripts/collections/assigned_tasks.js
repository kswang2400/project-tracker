BasecampApp.Collections.AssignedTasks = Backbone.Collection.extend({
  model: BasecampApp.Models.AssignedTask,
  url: function () { 
    return "/api/assigned_tasks";
  }
})