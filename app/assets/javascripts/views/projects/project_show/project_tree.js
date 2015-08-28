BasecampApp.Views.ProjectTree = Backbone.CompositeView.extend({
  template: JST["projects/project_show/project_tree"],
  className: "project-tree",

  events: {
    "click .project-link": "doNothing",
    "click li.task-link-list-item": "changeTaskDetailsSubview"

  },

  doNothing: function (event) {
    event.preventDefault();
  },

  initialize: function (options) {
    this.projectShowView = options.projectShowView;

    this.listenTo(this.model, "sync", this.render);

    this.listenTo(this.model.tasks(), "add", this.addTaskLinkSubview);
    this.listenTo(this.model.tasks(), "remove", this.removeTaskLinkSubview);

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

  changeTaskDetailsSubview: function (event) {
    event.preventDefault();

    var task_id = $(event.currentTarget).attr("id");
    var task = this.model.completed_tasks().getOrFetch(task_id);

    debugger;
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