BasecampApp.Models.Task = Backbone.Model.extend({
  urlRoot: "/api/tasks",

  initialize: function (options) {
    this.project = options.project;
  },

  parse: function (payload) {
    debugger;
    if (payload.assignments) {
      this.assignments().set(payload.assignments);
      delete payload.assignments;
    }

    return payload;
  },

  assignments: function () {
    this._assignments = this._assignments || new BasecampApp.Collections.AssignedTasks();
    return this._assignments;
  }
});