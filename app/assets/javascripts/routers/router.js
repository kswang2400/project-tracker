  BasecampApp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.projects = new BasecampApp.Collections.Projects();
  },

  routes: {
    "home": "index",
    "projects/:id":"show"
  },

  index: function () {
    this.projects.fetch();
    var view = new BasecampApp.Views.ProjectsIndex({ 
      collection: this.projects
    });
    this._swapView(view);
  },

  show: function (id) {
    project = this.projects.getOrFetch(id);
    var uploads = new BasecampApp.Collections.Uploads({ project: project });
    var memberships = new BasecampApp.Collections.Memberships({
      project: project
    });
    var tasks = new BasecampApp.Collections.Tasks({
      project: project
    })
    
    uploads.fetch();
    memberships.fetch();
    tasks.fetch();

    var view = new BasecampApp.Views.ProjectShow({
      model: project,
      uploads: uploads,
      memberships: memberships,
      tasks: tasks
    });

    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});