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
    var view = new BasecampApp.Views.ProjectShow({ 
      model: project
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