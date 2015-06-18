BasecampApp.Models.Task = Backbone.Model.extend({
  urlRoot: "/api/tasks",
  
  assignments: function () {
    this._assignments = this._assignments || new BasecampApp.Collections.AssignedTasks();
    return this._assignments;
  },

  parse: function (payload) {
    debugger;
    if (payload.assignments) {
      this.assignments().set(payload.assignments);
      delete payload.assignments;
    }

    if (payload.project_title) {
      this.project_title().set(payload.project_title);
      delete payload.assignments;
    }

    return payload;
  }
});