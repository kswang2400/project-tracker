  BasecampApp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.projects = new BasecampApp.Collections.Projects();
  },

  routes: {
    "home": "index",
    "projects/:id": "projectShow",
    "projects/:project_id/tasks/:id": "taskShow",
    "users/:id": "userShow"
  },

  index: function () {
    this.projects.fetch();
    var tagged = new BasecampApp.Collections.Projects();

    tagged.fetch({ data: {
      tagged: true
    }});

    var view = new BasecampApp.Views.ProjectsIndex({ 
      collection: this.projects,
      tagged: tagged
    });

    this._swapView(view);
  },

  projectShow: function (id) {
    var project = new BasecampApp.Models.Project({ id: id })
    project.fetch();

    var view = new BasecampApp.Views.ProjectShow({ model: project });

    this._swapView(view);
  },

  taskShow: function (project_id, id) {
    var project = this.projects.getOrFetch(project_id);
    var tasks = new BasecampApp.Collections.Tasks()
    var task = tasks.getOrFetch(id);
    debugger;
    var view = new BasecampApp.Views.TaskShow({ model: task });

    this._swapView(view);
  },

  userShow: function (id) {
    var users = new BasecampApp.Collections.Users()
    var user = users.getOrFetch(id);

    var view = new BasecampApp.Views.UsersShow({ model: user });
    
    this._swapView(view);
  },
  
  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.$el);
    view.render();
  }
});