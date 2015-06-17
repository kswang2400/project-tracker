BasecampApp.Models.Task = Backbone.Model.extend({
  urlRoot: "/api/tasks",

  initialize: function (options) {
    this.project = options.project;
  },

  parse: function (payload) {
    if (payload.assigned_users) {
      this.users().set(payload.assigned_users);
      delete payload.assigned_users;
    }

    return payload;
  },

  users: function () {
    this._users = this._users || new BasecampApp.Collections.Users();
    return this._users;
  }
});