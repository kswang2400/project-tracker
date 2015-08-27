BasecampApp.Views.ProjectTree = Backbone.CompositeView.extend({
  template: JST["projects/project_show/project_tree"],
  className: "project-tree",

  events: {
    "click .project-link": "doNothing"
  },

  doNothing: function (event) {
    event.preventDefault();
  },

  initialize: function (options) {
    this.projectShowView = options.projectShowView;

    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.completed_tasks(), "add", this.addTaskLinkSubview);
    this.listenTo(this.model.completed_tasks(), "remove", this.removeTaskLinkSubview);

    this.listenTo(this.model.incomplete_tasks(), "add", this.addTaskLinkSubview);
    this.listenTo(this.model.incomplete_tasks(), "remove", this.removeTaskLinkSubview);
  },

  addTaskLinkSubview: function (task) {
    var subview = new BasecampApp.Views.TaskLink({
      project: this.model,
      model: task,
      projectShowView: this.projectShowView
    });

    if (task.get("status") === "completed") {
      this.addSubview(".nav-task-list.tasks-completed", subview);
    } else {
      this.addSubview(".nav-task-list.tasks-incomplete", subview);
    }
  },

  removeTaskLinkSubview: function (task) {
    if (task.get("status") === "completed") {
      this.removeModelSubview(".nav-task-list.tasks-completed", task)
    } else {
      this.removeModelSubview(".nav-task-list.tasks-incomplete", task);
    }
  },

  render: function () {
    var content = this.template({ project: this.model });
    this.$el.html(content);
    this.attachSubviews();
    return this;
  }
})