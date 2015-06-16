  BasecampApp.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.projects = new BasecampApp.Collections.Projects();
  },

  routes: {
    "home": "index",
    "projects/:id":"projectShow",
    "projects/:project_id/tasks/:id": "taskShow"
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
    var project = this.projects.getOrFetch(id);

    var uploads = new BasecampApp.Collections.Uploads({ project: project });
    var memberships = new BasecampApp.Collections.Memberships({ project: project });
    var tasks = new BasecampApp.Collections.Tasks({ project: project });
    
    uploads.fetch();
    memberships.fetch();
    tasks.fetch();
    // TODO: nest associated objects in jbuilder
    
    var view = new BasecampApp.Views.ProjectShow({
      model: project,
      uploads: uploads,
      memberships: memberships,
      tasks: tasks
    });

    this._swapView(view);
  },

  taskShow: function (project_id, id) {
    var project = this.projects.getOrFetch(project_id);
    var tasks = new BasecampApp.Collections.Tasks({ project: project })
    var task = tasks.getOrFetch(id);

    var view = new BasecampApp.Views.TaskShow({ 
      model: task
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