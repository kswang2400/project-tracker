BasecampApp.Models.Project = Backbone.Model.extend({
  urlRoot: "/api/projects",
  // store associated collections to be called on later as a function.
  completed_tasks: function () {
    this._completed_tasks = this._completed_tasks || new BasecampApp.Collections.Tasks();
    return this._completed_tasks
  },

  incomplete_tasks: function () {
    this._incomplete_tasks = this._incomplete_tasks || new BasecampApp.Collections.Tasks();
    return this._incomplete_tasks
  },

  memberships: function () {
    this._memberships = this._memberships || new BasecampApp.Collections.Memberships();
    return this._memberships;
  },

  // override default parse function to pull out extranneous data from jbuilder
  parse: function (payload) {

    if (payload.completed_tasks) {
      this.num_complete = payload.completed_tasks.length
      this.completed_tasks().set(payload.completed_tasks);
      delete payload.completed_tasks
    }

    if (payload.incomplete_tasks) {
      this.num_incomplete = payload.incomplete_tasks.length
      this.incomplete_tasks().set(payload.incomplete_tasks);
      delete payload.incomplete_tasks
    }

    if (payload.memberships) {
      this.memberships().set(payload.memberships);
      delete payload.memberships
    }
    
    if (payload.uploads) {
      this.uploads().set(payload.uploads);
      delete payload.uploads;
    }

    return payload;
  },
  
  uploads: function () {
    this._uploads = this._uploads || new BasecampApp.Collections.Uploads();
    return this._uploads;
  }
});