BasecampApp.Models.Task = Backbone.Model.extend({
  urlRoot: "/api/tasks",
  
  assignments: function () {
    this._assignments = this._assignments || new BasecampApp.Collections.AssignedTasks();
    return this._assignments;
  },

  parse: function (payload) {
    // console.log(payload)
    // debugger;
    
    if (payload.assignments) {
      this.assignments().set(payload.assignments);
      delete payload.assignments;
    }

    if (payload.owner_name) {
      this.owner_name = payload.owner_name;
      delete payload.owner_name
    }

    if (payload.project_title) {
      this.project_title = payload.project_title;
      delete payload.assignments;
    }

    return payload;
  }
});