BasecampApp.Models.Task = Backbone.Model.extend({
  urlRoot: "/api/tasks",
  
  parse: function (payload) {
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