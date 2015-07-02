BasecampApp.Models.Project = Backbone.Model.extend({
  urlRoot: "/api/projects",

  // store associated collections to be called on later as a function.
  memberships: function () {
    this._memberships = this._memberships || new BasecampApp.Collections.Memberships();
    return this._memberships;
  },

  // override default parse function to pull out extranneous data from jbuilder
  parse: function (payload) {
    if (payload.uploads) {
      this.uploads().set(payload.uploads);
      delete payload.uploads;
    }

    if (payload.tasks) {
      this.tasks().set(payload.tasks, { parse: true });
      delete payload.tasks;
    }
    
    if (payload.memberships) {
      this.memberships().set(payload.memberships);
      delete payload.memberships
    }

    if (payload.incomplete_tasks) {
      this.num_incomplete = payload.incomplete_tasks.length
      delete payload.incomplete_tasks
    }

    if (payload.completed_tasks) {
      this.num_complete = payload.completed_tasks.length
      delete payload.completed_tasks
    }

    return payload;
  },

  tasks: function () {
    this._tasks = this._tasks || new BasecampApp.Collections.Tasks();
    return this._tasks;
  },
  
  uploads: function () {
    this._uploads = this._uploads || new BasecampApp.Collections.Uploads();
    return this._uploads;
  }
});