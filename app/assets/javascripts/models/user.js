BasecampApp.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  initialize: function () {

  },

  parse: function (payload) {

  },

  tasks: function () {
    this._tasks = this._tasks || new BasecampApp.Collections.Tasks({
      project: this
    });
    return this._tasks;
  },
})