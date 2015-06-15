BasecampApp.Collections.Tasks = Backbone.Collection.extend({
  model: BasecampApp.Models.Task,
  url: function () { 
    return "/api/projects/" + this.project.id + "/tasks";
  },
  
  initialize: function (options) {
    this.project = options.project;
  },

  getOrFetch: function (id) {
    var tasks = this;
    var task = tasks.get(id);

    if (!task) {
      task = new BasecampApp.Models.Task({ id: id });
      task.fetch({
        success: function () {
          tasks.add(task)
        }
      });
    } else {
      task.fetch();
    }

    return task;
  }
});