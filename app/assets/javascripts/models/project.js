BasecampApp.Models.Project = Backbone.Model.extend({
  urlRoot: "/api/projects",

  memberships: function () {
    this._memberships = this._memberships || new BasecampApp.Collections.Memberships({
      project: this
    });
    return this._memberships;
  },

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

    return payload;
  },

  tasks: function () {
    this._tasks = this._tasks || new BasecampApp.Collections.Tasks({
      project: this
    });
    return this._tasks;
  },
  
  uploads: function () {
    this._uploads = this._uploads || new BasecampApp.Collections.Uploads({
      project: this
    });
    return this._uploads;
  }
});