BasecampApp.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  parse: function (payload) {
    if (payload.projects) {
      this.projects().set(payload.projects);
      delete payload.projects;
    }

    if (payload.completed) {
      this.completed().set(payload.completed, { parse: true });
      delete payload.completed;
    }

    if (payload.tasks) {
      this.tasks().set(payload.tasks, { parse: true });
      delete payload.tasks;
    }
    return payload;
  },

  completed: function () {
    this._completed = this._completed || new BasecampApp.Collections.Tasks();
    return this._completed
  },

  projects: function () {
    this._projects = this._projects || new BasecampApp.Collections.Projects();
    return this._projects;
  },

  tasks: function () {
    this._tasks = this._tasks || new BasecampApp.Collections.Tasks();
    return this._tasks;
  }
})